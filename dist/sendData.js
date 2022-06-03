"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = void 0;
const dateformat_1 = __importDefault(require("dateformat"));
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebase_config_1 = require("./firebase.config");
const app = (0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
const database = (0, firestore_1.getFirestore)(app);
const date = new Date();
const dbName = (0, dateformat_1.default)(date, "dd-mm-yyyy");
const firebase = async (News_18, IndiaToday) => {
    const dbRef = (0, firestore_1.doc)(database, "news", dbName);
    const docSnap = await (0, firestore_1.getDoc)(dbRef);
    if (docSnap.exists()) {
        await (0, firestore_1.updateDoc)(dbRef, {
            news18: (0, firestore_1.arrayUnion)(News_18),
            IndiaToday: (0, firestore_1.arrayUnion)(IndiaToday),
        });
    }
    else {
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(database, "news", dbName), {
            news18: (0, firestore_1.arrayUnion)(News_18),
            IndiaToday: (0, firestore_1.arrayUnion)(IndiaToday),
        });
    }
};
exports.firebase = firebase;
//# sourceMappingURL=sendData.js.map