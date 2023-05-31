var bunyan = require("bunyan"),
    bformat = require("bunyan-format"),
    formatOut = bformat({ outputMode: "short" });

var log = bunyan.createLogger({
    name: "passify",
    stream: formatOut,
    level: "debug",
});

module.exports = log;
