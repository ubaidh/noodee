#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { createFile, createDirectory, initializeNodeProject } from './util.exports'


function createProjectDirectory(projectName: string): void {
    if (!projectName) {
        console.error('Please specify a project name.');
        process.exit(1);
    }
    const projectPath = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectPath)) {
        createDirectory(projectPath);
        initializeNodeProject(projectPath);
        console.log(`Project directory created: ${projectPath}`);
        const serverfilecontent =
            `const express = require("express");
        const http = require("http");
        const logger = require("morgan");
        const cors = require("cors");
        const path = require("path");
        const fs = require("fs");
        const dotenv = require("dotenv").config({
            path: path.resolve(__dirname, "./.env"),
        });
        const routes = require("./src/routes/routes.js");
        const app = express();
        const server = http.createServer(app);
        app.use(logger('dev', {
            skip: function (req, res) { return res.statusCode < 400 }
          }))
        app.use(express.json({ limit: "100mb" }));
        app.use(
            express.urlencoded({
                limit: "100mb",
                extended: true,
            })
        );
        app.use(logger('common', {
            stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
          }))
        app.use("/public/images", express.static(__dirname + "/public/images"));
        app.use(function (req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "X-Requested-With,content-type, Authorization"
            );
            next();
        });
        const corsOptions = {
            origin: "*",
            optionsSuccessStatus: 200,
            credentials: true,
        };
        app.use(cors(corsOptions));
        routes(app, express, "/api/v1");
        if (app.get("env") === "development") {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500).json({
                    message: err.message,
                    error: err,
                });
            });
        } else {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500).json({
                    message: err.message,
                    error: {},
                });
            });
        }
        server.listen(process.env.API_PORT || 5010, function () {
            console.log("Running on port: " + process.env.API_PORT);
        });`;
        createFile(path.join(projectPath, 'server.js'), serverfilecontent);
        createFile(path.join(projectPath, '.env'), `
        API_PORT=5010
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=
        DB_NAME=
        DB_DIALECT=mysql`
        );
        createFile(path.join(projectPath, '.gitignore'),
            `node_modules
        .env
        .vscode
        .idea
        .DS_Store
        .gitignore
        access.log
        `);
        createDirectory(path.join(projectPath, 'src'));
        createDirectory(path.join(projectPath, 'public'));
        createDirectory(path.join(projectPath, 'public', 'images'));
        createDirectory(path.join(projectPath, 'src', 'models'));
        createDirectory(path.join(projectPath, 'src', 'models', 'api'));
        createDirectory(path.join(projectPath, 'src', 'models', 'api', 'v1'));
        createDirectory(path.join(projectPath, 'src', 'routes'));
        createDirectory(path.join(projectPath, 'src', 'routes', 'api'));
        createDirectory(path.join(projectPath, 'src', 'routes', 'api', 'v1'));
        createFile(path.join(projectPath, 'src', 'routes', 'routes.js'),
            `var models = require("../models/api/v1/models.js");
            module.exports = function (app, express, routeStart) {
                app.use(routeStart, require("./api/v1/test")(models, express));
            };`
        );
        createFile(path.join(projectPath, 'src', 'models', 'api', 'v1', 'models.js'),
            `var Sequelize = require("sequelize");
        var sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                },
            }
        );
        var db = {};
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        module.exports = db;`
        );
        createFile(path.join(projectPath, 'src', 'routes', 'api', 'v1', 'test.js'),
            `var express = require("express");
        var router = express.Router();
        module.exports = function (models, express) {
            router.get("/test", function (req, res) {
                res.json({ message: "API is working" });
            });
            return router;
        };`
        );
        createDirectory(path.join(projectPath, 'src', 'middlewares'));
        createDirectory(path.join(projectPath, 'src', 'middlewares', 'api'));
        createDirectory(path.join(projectPath, 'src', 'middlewares', 'api', 'v1'));
        createDirectory(path.join(projectPath, 'src', 'services'));
        createDirectory(path.join(projectPath, 'src', 'services', 'api'));
        createDirectory(path.join(projectPath, 'src', 'services', 'api', 'v1'));
        createDirectory(path.join(projectPath, 'src', 'utils'));
        createDirectory(path.join(projectPath, 'src', 'utils', 'api'));
        createDirectory(path.join(projectPath, 'src', 'utils', 'api', 'v1'));
        createDirectory(path.join(projectPath, 'src', 'config'));
        createDirectory(path.join(projectPath, 'src', 'config', 'api'));
        createDirectory(path.join(projectPath, 'src', 'config', 'api', 'v1'));
        createDirectory(path.join(projectPath, 'src', 'docs'));
        createDirectory(path.join(projectPath, 'src', 'docs', 'api'));
        createDirectory(path.join(projectPath, 'src', 'docs', 'api', 'v1'));
        console.log(`Project setup complete: ${projectPath}`);
    } else {
        console.log(`Project directory already exists: ${projectPath}`);
    }
}
const projectName = process.argv[2];
createProjectDirectory(projectName);

