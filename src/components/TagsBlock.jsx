import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";



export const TagsBlock = ({ onTagClick, items, isLoading = true }) => {


  return (
    <SideBlock title="Тэги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <p 
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
          >
        
            <ListItem key={i} disablePadding>
          
              <ListItemButton onClick={() => onTagClick(name)}>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
          
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </p>
        ))}
      </List>
    </SideBlock>
  );
};
