//const { CLIENT_ORIGIN } = require("../config/db.js");

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
CLIENT_ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_ORIGIN
    : "http://localhost:3000";

module.exports = {
  confirm: (id) => ({
    subject: " Confirm Email-id to complete registration",
    html: `
      <h4>Thanks for your Registration. Confirm your e-mail id and Manage your expenses </h4>
      <br/>
      <a href='${CLIENT_ORIGIN}/confirm/${id}'>
        Click to confirm email
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`,
  }),
  forgotPassword: (id) => ({
    subject: "Confirm Email to Change Password",
    html: `
     <h4> We are there to help you. Click the link to change your password</h4><br/>
      <a href='${CLIENT_ORIGIN}/changePassword/${id}'>
        click to confirm email
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/changePassword/${id}`,
  }),
};
