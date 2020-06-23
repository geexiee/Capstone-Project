import React from 'react'
import {
    FormControl,
    TextField,
    Button,
    ButtonGroup,
    InputLabel,
    Select,
    createMuiTheme, MuiThemeProvider
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './login.css';
import { Redirect } from 'react-router-dom';
import SessionDetails from './SessionDetails';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2D9CDB',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            contrastText: '#2D9CDB',
        },
    },
});

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            userType: '',
            emailError: 'Please enter a valid email address.',
            passworError: 'Password cannot be empty.',
            emailValid: true,
            passwordValid: true,
            userTypeValid: true,
            formValid: false,
            passwordInit: false,
            formError: false,
            formSuccess: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.setState({ [fieldName]: fieldValue },
            () => { this.validateField(fieldName, fieldValue) });
    }

    validateField(field, value) {
        if (field === 'email') {
            this.state.emailValid = value.match(/^.+@.+$/i);
        }
        else if (field === 'password') {
            this.state.passwordInit = true;
            this.state.passwordValid = value.length > 0;
        }
        else if (field === 'userType') {
            this.state.userTypeValid = value.match(/^(Skills\sBackpack\sAdmin)|(Course\sAdmin)|(Student)|(Employer)$/i);
        }
        this.validateForm();
    }

    handleSubmit(event) {
        // let data = JSON.stringify({
        //     username: this.state.email,
        //     password: this.state.password
        // });
        // let url = 'https://localhost:5000/account/login';
        // console.log('Sending to ' + url + ': ' + data);
        // var xhr = new XMLHttpRequest();
        //
        // xhr.addEventListener('load', () => {
        //     get the data from the json response
        //     let response = xhr.responseText;
        //     console.log(response);
        //     let status = response["logged_in"];
        //     let username = response["user"];
        //     if (status == "failed") {
        //         this.state.formError = true;
        //     }
        // });
        //
        // xhr.open('POST', url);
        // xhr.send(data);
        // ADD below 2 lines for form error case
        // this.state.formError = true;
        // this.forceUpdate();
        SessionDetails.setEmail("gordon.xie@atlassian.com");
        this.state.formSuccess = true;
        this.forceUpdate();
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.userTypeValid});
    }

    render() {
        if ((this.state.formSuccess) || (SessionDetails.getEmail() != "")) {
            return <Redirect to='./home' />
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1>Skills Backpack</h1>
                    </header>
                    <body className="Login-body">
                    <div className="Form-container" style={{marginBottom: "30px"}}>
                        <h3 className="Login-title">Sign In</h3>
                        {this.state.formError === true &&
                        <div className=".Login-alert-row">
                            <div className="Login-alert-container">
                                <Alert className="Login-alert" severity="error">Incorrect email or password.</Alert>
                            </div>
                        </div>
                        }
                        <FormControl variant="outlined" classType="Login-text-field">
                            <InputLabel className="Login-label" htmlFor="outlined-age-native-simple">I'm a
                                ...</InputLabel>
                            <Select
                                className="Login-select"
                                native
                                value={this.state.userType}
                                onChange={this.handleChange}
                                label="Age"
                                inputProps={{
                                    name: 'userType',
                                    id: 'outlined-userType-native-simple',
                                }}
                            >
                                <option aria-label="None" value=""/>
                                <option value="Skills Backpack Admin">Skills Backpack Admin</option>
                                <option value="Course Admin">Course Admin</option>
                                <option value="Student">Student</option>
                                <option value="Employer">Employer</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="Form-container">
                        <FormControl>
                            {/*<h5 className="Login-field-title">Email Address</h5>*/}
                            <div className="Login-text-field">
                                <TextField
                                    id="email-input"
                                    name="email"
                                    label="Email Address"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    className="Login-input-field"
                                    onChange={this.handleChange}
                                    helperText={this.state.emailValid ? '' : this.state.emailError}
                                />
                            </div>
                            {/*<h5 className="Login-field-title">Password</h5>*/}
                            <div className="Login-text-field">
                                <TextField
                                    id="password-input"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    className="Login-input-field"
                                    onChange={this.handleChange}
                                    helperText={this.state.passwordValid ? '' : this.state.passworError}
                                />
                            </div>
                        </FormControl>
                    </div>
                    <div className="Login-button-container">
                        <MuiThemeProvider theme={theme}>
                            <ButtonGroup variant="contained" color="primary"
                                         aria-label="contained primary button group">
                                <Button
                                    type="submit"
                                    disabled={!(this.state.formValid && this.state.passwordInit)}
                                    onClick={this.handleSubmit}
                                >Sign In</Button>
                            </ButtonGroup>
                        </MuiThemeProvider>
                    </div>
                    <div className="Register-redirect-container">
                        <p className="Register-redirect-text" style={{alignSelf: "centre"}}>Don't have an account
                            yet? <a href='./register'>Sign up!</a></p>
                    </div>
                    </body>
                    <footer className="Home-footer">
                        <p>Yuppies 2020 </p>
                    </footer>
                </div>
            )
        }
    }
}
export default Login