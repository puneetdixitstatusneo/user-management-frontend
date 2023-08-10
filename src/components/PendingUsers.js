import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PropTypes from 'prop-types';

export default function PendingUsersTable(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const { pendingUsers, approveOrReject } = props;

    // const timeFormatter = (dateTimeString) => {
    //     const dateParts = dateTimeString.split(' ');
    //     const timeParts = dateParts[4].split(':');
    //     const hours = parseInt(timeParts[0], 10);
    //     const minutes = parseInt(timeParts[1], 10);
    //     const amOrPm = hours >= 12 ? 'PM' : 'AM';
    //     const formattedHours = (hours % 12) || 12;

    //     return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    // };
    const filteredUsers = pendingUsers.filter(user =>
        user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 550, mt: 5 }}>
            <TextField
                label={searchQuery.length || isInputFocused ? "Search" : "Search Email, Name and Username..."}
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ml: 1, mr: -6,  width: "550px"}}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            />
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff', fontWeight: "bold" }}>
                        <TableCell>User ID</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">User Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Requested On</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map((row) => (
                        <TableRow
                            key={row.user_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.user_id}
                            </TableCell>
                            <TableCell align="left">{row.first_name}</TableCell>
                            <TableCell align="center">{row.last_name}</TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.created_on}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color={row.status === "prepared" ? "secondary" : "success"}
                                    sx={{ width: "110px", fontSize: "1", mr: 1 }}
                                    onClick={() => approveOrReject(row.user_id)}
                                >
                                    <DoneIcon />
                                    Approve
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: "110px", fontSize: "1" }}
                                    // onClick={() => approveOrReject(row.user_id)}
                                >
                                    <CancelOutlinedIcon />
                                    Reject
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

PendingUsersTable.propTypes = {
    pendingUsers: PropTypes.array,
    approveOrReject: PropTypes.func
};
