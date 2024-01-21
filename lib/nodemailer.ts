import nodemailer from "nodemailer"
import { Transporter } from 'nodemailer';
import { ClientMember } from "@/types";

const user = process.env.NEXT_USER_EMAIL_FROM;
const password = process.env.NEXT_USER_EMAIL_PASSWORD;

export const transporter: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user,
        pass: password,
    },
});

export const generateMailOptions = (users: ClientMember[], subject: string, html: string) => {
    const to = [...users.map(item => item.user.email)].join(', ')
    return {
        from: user,
        to: to,
        subject,
        html,
    };
}