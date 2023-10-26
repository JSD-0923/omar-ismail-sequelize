"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomer = exports.loginCustomer = exports.createCustomer = void 0;
var customer_1 = require("../models/customer");
var books_1 = require("../models/books");
var rental_1 = require("../models/rental");
var bcrypt_1 = require("bcrypt");
var jwt = require("jsonwebtoken");
// register a new customer
var createCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, hashedPassword, customer, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, password = _a.password;
                hashedPassword = (0, bcrypt_1.hashSync)(password, 10);
                console.log('Username:', username);
                console.log('Hashed Password:', hashedPassword);
                return [4 /*yield*/, customer_1.default.create({ username: username, password: hashedPassword })];
            case 1:
                customer = _b.sent();
                response = "customer created successfully\n".concat(JSON.stringify({ customer: customer }, null, 2));
                res.status(200).send(response);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).send('Failed to create the customer');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCustomer = createCustomer;
// login  customer
var loginCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, payload, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, customer_1.default.findOne({
                        where: { username: req.body.username },
                    })];
            case 1:
                customer = _a.sent();
                if (!customer) {
                    res.status(401).send("Could not find the customer");
                    return [2 /*return*/];
                }
                if ((0, bcrypt_1.compareSync)(req.body.password, customer.password)) {
                    payload = {
                        username: customer.username,
                        id: customer.id,
                        sub: customer.id
                    };
                    token = jwt.sign(payload, "Random Sting", { expiresIn: "1d" });
                    res.status(200).send({
                        message: "Logged in successfully",
                        token: "Bearer " + token
                    });
                }
                else {
                    res.status(401).send("Incorrect password");
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).send('Failed to create a book');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginCustomer = loginCustomer;
var getCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, customer_1.default.findAll({
                    include: [
                        {
                            model: rental_1.default,
                            include: [
                                {
                                    model: books_1.default,
                                }
                            ],
                        },
                    ],
                })];
            case 1:
                result = _a.sent();
                console.log(result);
                res.status(200).send(result);
                return [2 /*return*/];
        }
    });
}); };
exports.getCustomer = getCustomer;
