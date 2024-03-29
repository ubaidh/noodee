#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var util_exports_1 = require("./util.exports");
function createProjectDirectory(projectName) {
    if (!projectName) {
        console.error('Please specify a project name.');
        process.exit(1);
    }
    var projectPath = path.join(process.cwd(), projectName);
    if (!fs.existsSync(projectPath)) {
        (0, util_exports_1.createDirectory)(projectPath);
        (0, util_exports_1.initializeNodeProject)(projectPath);
        console.log("Project directory created: ".concat(projectPath));
        var serverfilecontent = "const express = require(\"express\");\n        const http = require(\"http\");\n        const logger = require(\"morgan\");\n        const cors = require(\"cors\");\n        const path = require(\"path\");\n        const fs = require(\"fs\");\n        const dotenv = require(\"dotenv\").config({\n            path: path.resolve(__dirname, \"./.env\"),\n        });\n        const routes = require(\"./src/routes/routes.js\");\n        const app = express();\n        const server = http.createServer(app);\n        app.use(logger('dev', {\n            skip: function (req, res) { return res.statusCode < 400 }\n          }))\n        app.use(express.json({ limit: \"100mb\" }));\n        app.use(\n            express.urlencoded({\n                limit: \"100mb\",\n                extended: true,\n            })\n        );\n        app.use(logger('common', {\n            stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })\n          }))\n        app.use(\"/public/images\", express.static(__dirname + \"/public/images\"));\n        app.use(function (req, res, next) {\n            res.setHeader(\"Access-Control-Allow-Origin\", \"*\");\n            res.setHeader(\"Access-Control-Allow-Methods\", \"GET, POST\");\n            res.setHeader(\n                \"Access-Control-Allow-Headers\",\n                \"X-Requested-With,content-type, Authorization\"\n            );\n            next();\n        });\n        const corsOptions = {\n            origin: \"*\",\n            optionsSuccessStatus: 200,\n            credentials: true,\n        };\n        app.use(cors(corsOptions));\n        routes(app, express, \"/api/v1\");\n        if (app.get(\"env\") === \"development\") {\n            app.use(function (err, req, res, next) {\n                res.status(err.status || 500).json({\n                    message: err.message,\n                    error: err,\n                });\n            });\n        } else {\n            app.use(function (err, req, res, next) {\n                res.status(err.status || 500).json({\n                    message: err.message,\n                    error: {},\n                });\n            });\n        }\n        server.listen(process.env.API_PORT || 5010, function () {\n            console.log(\"Running on port: \" + process.env.API_PORT);\n        });";
        (0, util_exports_1.createFile)(path.join(projectPath, 'server.js'), serverfilecontent);
        (0, util_exports_1.createFile)(path.join(projectPath, '.env'), "\n        API_PORT=5010\n        DB_HOST=localhost\n        DB_USER=root\n        DB_PASSWORD=\n        DB_NAME=\n        DB_DIALECT=mysql");
        (0, util_exports_1.createFile)(path.join(projectPath, '.gitignore'), "node_modules\n        .env\n        .vscode\n        .idea\n        .DS_Store\n        .gitignore\n        access.log\n        ");
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'public'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'public', 'images'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'models'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'models', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'models', 'api', 'v1'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'routes'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'routes', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'routes', 'api', 'v1'));
        (0, util_exports_1.createFile)(path.join(projectPath, 'src', 'routes', 'routes.js'), "var models = require(\"../models/api/v1/models.js\");\n            module.exports = function (app, express, routeStart) {\n                app.use(routeStart, require(\"./api/v1/test\")(models, express));\n            };");
        (0, util_exports_1.createFile)(path.join(projectPath, 'src', 'models', 'api', 'v1', 'models.js'), "var Sequelize = require(\"sequelize\");\n        var sequelize = new Sequelize(\n            process.env.DB_NAME,\n            process.env.DB_USER,\n            process.env.DB_PASSWORD,\n            {\n                host: process.env.DB_HOST,\n                dialect: process.env.DB_DIALECT,\n                pool: {\n                    max: 5,\n                    min: 0,\n                    idle: 10000,\n                },\n            }\n        );\n        var db = {};\n        db.sequelize = sequelize;\n        db.Sequelize = Sequelize;\n        module.exports = db;");
        (0, util_exports_1.createFile)(path.join(projectPath, 'src', 'routes', 'api', 'v1', 'test.js'), "var express = require(\"express\");\n        var router = express.Router();\n        module.exports = function (models, express) {\n            router.get(\"/test\", function (req, res) {\n                res.json({ message: \"API is working\" });\n            });\n            return router;\n        };");
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'middlewares'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'middlewares', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'middlewares', 'api', 'v1'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'services'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'services', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'services', 'api', 'v1'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'utils'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'utils', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'utils', 'api', 'v1'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'config'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'config', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'config', 'api', 'v1'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'docs'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'docs', 'api'));
        (0, util_exports_1.createDirectory)(path.join(projectPath, 'src', 'docs', 'api', 'v1'));
        console.log("Project setup complete: ".concat(projectPath));
    }
    else {
        console.log("Project directory already exists: ".concat(projectPath));
    }
}
var projectName = process.argv[2];
createProjectDirectory(projectName);
