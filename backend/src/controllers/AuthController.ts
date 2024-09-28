import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthService } from "../interfaces/IAuthService";

@injectable()
export class AuthController {
    constructor(@inject("AuthService") private authService: IAuthService) {}

    async register(req: Request, res: Response) {
        try {
            const { email, password, name, isAdmin } = req.body; 
            const user = await this.authService.register({ email, password, name, isAdmin }); 
            res.status(201).json({ user });
        } catch (error) {
            res.status(400).json({ error: error || "Registration failed" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: error || "Login failed" });
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { email, newPassword } = req.body; 
            await this.authService.resetPassword(email, newPassword); 
            res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
            res.status(400).json({ error: error || "Password reset failed." });
        }
    }
}
