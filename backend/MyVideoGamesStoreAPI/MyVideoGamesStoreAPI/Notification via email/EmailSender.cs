using System.Diagnostics;
using System.Net;
using System.Net.Mail;

namespace MyVideoGamesStoreAPI.Notification_via_email
{
    public class EmailSender
    {
        private readonly IConfiguration _configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        /// <summary>
        /// Sends an email with the specified recipient, subject, and body.
        /// Slanje emaila sa zadatim primaocem, predmetom i telom.
        /// </summary>
        /// <param name="recipient">The email address of the recipient.</param>
        /// <param name="subject">The subject of the email.</param>
        /// <param name="body">The body of the email.</param>
        public void SendEmail(string recipient, string subject, string body)
        {
            string fromMail = _configuration["EmailSettings:FromEmail"];
            string fromPassword = _configuration["EmailSettings:FromPassword"];
            string toMail = recipient;
            MailMessage message = new MailMessage
            {
                From = new MailAddress(fromMail),
                Subject = subject
            };

            message.To.Add(new MailAddress(toMail));
            message.Body = body;
            message.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromMail, fromPassword),
                EnableSsl = true,
            };

            try
            {
                smtpClient.Send(message);
                Debug.WriteLine("Email je uspešno poslat!\n");
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Došlo je do greške tokom slanja emaila:\n {ex.Message}\n");
            }
        }
    }
}