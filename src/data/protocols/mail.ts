export interface MailSender {
    sendMail(destiny: string, body: string): Promise<void> 
}