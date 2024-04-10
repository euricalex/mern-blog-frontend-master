import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../components/axios'
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../components/redux/slices/auth';



export const AddPost = () => {
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [text, setText] = React.useState('');
  const [loading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageURL, setImageURL] = React.useState('');
  const inputFileRef = React.useRef(null);
const isEditing = Boolean(id);

  const handleChangeFile = async(e) => {
try {
const formData = new FormData();


const file = e.target.files[0];
formData.append('image', file);
const {data} = await axios.post('/upload', formData);
setImageURL(data.url);
} catch(err) {
console.warn(err);
alert('Error downloading a file')
}
  };

  const onClickRemoveImage = async() => {
 setImageURL('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);
const onSubmit = async() => {
try {
setIsLoading(true);
const fields = {
  title,
  imageURL,
  tags,
  text
  

};

const {data} = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);
const _id =  isEditing ? id : data._id;

navigate(`/posts/${_id}`)
}
 catch(err) {
  console.warn(err);
  alert('Error creating a file')
}
}

React.useEffect(() => {
if(id) {
  axios.get( `/posts/${id}`).then(({data}) => {
    setTitle(data.title);
    setText(data.text);
    setImageURL(data.imageURL);
    setTags(data.tags.join(','));
  }).catch((err) => {
    console.warn(err);
    alert('Error getting an article');
  })
}
}, [])
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if(!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to = "/"/>;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageURL && (
     <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
           <img className={styles.image} src={`http://localhost:4444${imageURL}`} alt="Uploaded" /></>
      )}
   
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }}  value={tags}  onChange={(e) => setTags(e.target.value)} variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
         {isEditing ? 'Зберегти' : 'Опубликовать'} 
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
