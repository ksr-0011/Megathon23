import React from 'react'
import UserCreator from './UserCreator.js'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import { FcSearch } from 'react-icons/fc';
import Navbar from './Navbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import logo from '../logo.jpg'
import { Typography } from '@mui/joy';
import UpdateTwoToneIcon from '@mui/icons-material/UpdateTwoTone';
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone';
import StarRateIcon from '@mui/icons-material/StarRate';
import UserLoader from './UserLoader.js'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
const backend = process.env.REACT_APP_BACKEND_URL ;
const micro = process.env.REACT_APP_MICROSERVICE;
export default function LoadAll() {
  const [value, setValue] = React.useState('two');
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    console.log(value)
    setPage(value);
  };
  const navigate = useNavigate()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [users, setUsers] = React.useState([])
  const pageSize = 12
  React.useEffect(() => {
    (async function () {
      const res = await fetch(backend+"/giveUsers", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const res_json = await res.json()
      setUsers(res_json.users)
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='columns is-vcentered is-mobile m-0'>
        <div className=" column is-hidden-mobile is-hidden-tablet-only is-1-desktop mb-0 mr-0" style={{ padding: "0px", margin: "auto" }} >
          <img alt="" className="image is-128x128" src={logo} />
        </div>
        <div className=" column mb-0 is-hidden-mobile is-hidden-tablet-only is-1-desktop mt-2 ml-0" style={{ padding: "0px" }} >
          <span className='is-size-4 has-text-white' style={{ marginTop: "auto", marginBottom: "auto", padding: "0" }}>JANAK AI</span>
        </div>
        <div className='column is-10-desktop ' style={{ margin: "auto" }}>
          <div className="field has-addons">
            <div className='control' style={{ marginTop: "auto", marginBottom: "auto" }}>
              <p className="control has-icons-left has-text-centered">
                <input className="input is-large" size="80" placeholder="Search" style={{ borderRadius: "290000px", borderWidth: "3px", borderColor: "black" }} />
                <span className="icon is-small is-left">
                  <FcSearch />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='primary'
          indicatorColor="primary"
          aria-label="secondary tabs example"
          centered
          style={{ width: "95%", margin: "auto" }}
        >
          <Tab value="three" label={<Typography style={{ color: 'white' }}>Recents</Typography>} icon={<UpdateTwoToneIcon style={{ color: "white" }} />} iconPosition="start" onClick={() => { navigate("/recents") }} />
          <Tab value="two" label={<Typography style={{ color: 'white' }}>All Users</Typography>} icon={<GroupTwoToneIcon style={{ color: "white" }} />} iconPosition="start" onClick={() => { navigate("/") }} />
        </Tabs>
      </Box>
      <br />
      <br />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {
          users.slice((page - 1) * pageSize, (page) * pageSize).map((user) => {
            return (
              <Grid item xs={2} sm={2}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <UserLoader user={user} />
                </div>
              </Grid>
            );
          })
        }
        {
          page==(Math.ceil((users.length + 1) / pageSize))?<Grid item xs={2} sm={2}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <UserCreator />
            </div>
          </Grid>:null
        }
      </Grid>
      <br /><br />
      <footer style={{ backgroundColor: 'lightgrey', padding: '10px', textAlign: 'center', position: 'fixed', bottom: 0, width: "100%", opacity: 1, zIndex: 199 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil((users.length + 1) / pageSize)}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      </footer>
    </div>
  )
}
