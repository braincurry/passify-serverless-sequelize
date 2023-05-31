const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateName = (name) => {
    const name_regex = new RegExp("^([A-Za-z0-9ÄÖÜäöü]{2,})$");
    return name_regex.test(name);
};

const validatePassword = (password) => {
    const pass_regex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    return pass_regex.test(password);
};

module.exports = {
    validateEmail,
    validateName,
    validatePassword,
};
