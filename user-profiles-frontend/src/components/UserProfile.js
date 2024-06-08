import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Grid,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

const UserProfile = ({ user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedUser);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <Card sx={{ margin: 1, border: 1, borderColor: "grey.300", objectFit:'contain' }}>
      <CardContent>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: 10,
            textAlign: "center",
          }}
        >
          <img
            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
            alt={user.name}
            width={150}
            height={150}
            style={{ objectFit: "cover", display: "block", margin: "0 auto" }}
          />
        </div>
        <Typography variant="h6" color="textPrimary" align="left" gutterBottom>
          {user.name}
        </Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <IconButton size="small">
              <EmailOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <IconButton size="small">
              <PhoneEnabledOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {user.phone}
            </Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <IconButton size="small">
              <LanguageOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              <Link
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener"
              >
                {user.website}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          background: "grey.300",
        }}
      >
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          sx={{
            border: "1px solid grey",
            backgroundColor: "grey.300",
            borderRadius: "0px",
            width: "33.1%",
          }}
        >
          {isFavorite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton
          size="small"
          onClick={handleEditClick}
          sx={{
            border: "1px solid grey",
            backgroundColor: "grey.300",
            borderRadius: "0px",
            width: "33.1%",
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => onDelete(user._id)}
          size="small"
          sx={{
            border: "1px solid grey",
            backgroundColor: "grey.300",
            borderRadius: "0px",
            width: "33.1%",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
      {isEditing && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid grey",
            boxShadow: 24,
            p: 4,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleFormSubmit}>
            <Typography variant="h6" gutterBottom>
              Edit User Details
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              value={editedUser.phone}
              onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Website"
              value={editedUser.website}
              onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </form>
        </Box>
      )}
    </Card>
  );
};

export default UserProfile;
