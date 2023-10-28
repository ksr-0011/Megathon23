import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';
import user from '../user-128.png'
import { useNavigate } from 'react-router-dom';
const backend = process.env.REACT_APP_BACKEND_URL ;
const micro = process.env.REACT_APP_MICROSERVICE;
export default function UserLoader(props) {
  const navigate = useNavigate()
  const GotoChat = async () => {
    const res = await fetch(backend+"/addRecent", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({
        id: props.user._id
      })
    });
    navigate("/chat/"+props.user._id)
  }
  return (
    <Card variant="outlined" sx={{ width: 200, height: 288 }}>
      <CardOverflow>
        <AspectRatio ratio="1">
          <img
            src={user}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Button style={{ marginTop: "0.5rem" }} overlay underline="none" onClick={GotoChat}>
            {props.user.fname + " " + props.user.lname}
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}