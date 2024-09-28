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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const firebase_1 = require("../config/firebase");
class TaskRepository {
    constructor() {
        this.collection = firebase_1.db.collection("tasks");
    }
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = Object.assign(Object.assign({}, task), { id: uuidv4(), createdAt: new Date() });
            t;
            yield this.collection.doc(newTask.id).set(newTask);
            return newTask;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = [];
            const snapshot = yield this.collection.where("userId", "==", userId).get();
            snapshot.forEach((doc) => tasks.push(Object.assign({ id: doc.id }, doc.data())));
            return tasks;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskDoc = yield this.collection.doc(id).get();
            if (taskDoc.exists) {
                return Object.assign({ id: taskDoc.id }, taskDoc.data());
            }
            return null;
        });
    }
    update(id, updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskRef = this.collection.doc(id);
            const taskDoc = yield taskRef.get();
            if (taskDoc.exists) {
                yield taskRef.update(updatedTask);
                return Object.assign(Object.assign({ id: taskDoc.id }, taskDoc.data()), updatedTask);
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskRef = this.collection.doc(id);
            const taskDoc = yield taskRef.get();
            if (taskDoc.exists) {
                yield taskRef.delete();
                return true;
            }
            return false;
        });
    }
}
exports.TaskRepository = TaskRepository;
