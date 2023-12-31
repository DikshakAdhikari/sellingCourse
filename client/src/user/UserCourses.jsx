import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PORT_LINK } from "../../Config";


export const UserCourses = () => {
  
  const [courses, setCourses] = useState([]);
  const navigate= useNavigate();
  useEffect(() => {
    const fun = async () => {
      try {
        const cou = await axios.get(`${PORT_LINK}/users/courses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenUser")}`,
          },
        });
        //console.log(cou.data.userCourses);
        setCourses(cou.data.userCourses);
      } catch (err) {
        console.log(err);
      }
    };

    fun();
  }, []);

  return (
    <div>
      <Typography
        variant={"h4"}
        fontWeight="bold"
        style={{ display: "flex", justifyContent: "center", margin: 30,color:"#002244" }}
      >
        Courses to Purchase
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 15,
          backgroundColor:"#eee"
        }}
       
      >
        {courses.map((course) => (
          <div key={course._id}>
            <Course course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Course = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div  onClick={()=>{ //I tried to store the particular course out of multiple user courses to purchase in recoil, but it result set default values of recoil on reloading the Purchase.jsx page. So we will extract the course using the id of the course to purchase in purchase.jsx and then we'll store that particular course in our user db while clicking buy now button
       navigate('/user/purchase/'+course._id)}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
         component="img"
          height="200"
         
          image={course.imageLink}
          alt= {course.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"  fontWeight="bold">
          {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <h3>{course.description}</h3>
          </Typography>
          <Typography gutterBottom variant="h8" fontWeight="bold" component="div">
           ${course.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    </div>


  );
};
