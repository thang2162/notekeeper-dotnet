using System;

using MailKit.Net.Smtp;
using MimeKit;

using System.Threading.Tasks;

namespace Notekeeper.Utils
{
    public class MailSender
    {

        public static async Task<bool> SendMail(string toEmail, string sub, string mess, AppSettings _appSettings)
		{
            return await Task.Run(() => {

                bool sendStatus = true;

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(_appSettings.EmailName, _appSettings.EmailFrom));
                message.To.Add(MailboxAddress.Parse(toEmail));
                message.Subject = sub;

                message.Body = new TextPart("plain")
                {
                    Text = @mess
                };



                var client = new SmtpClient();
                client.Connect(_appSettings.EmailHost, _appSettings.EmailPort, _appSettings.EmailIsSecure);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate(_appSettings.EmailUser, _appSettings.EmailPass);

                try
                {
                    client.Send(message);
                }
                catch (SmtpCommandException ex)
                {
                    sendStatus = false;
                    Console.WriteLine("Error sending message: {0}", ex.Message);
                    Console.WriteLine("\tStatusCode: {0}", ex.StatusCode);

                    switch (ex.ErrorCode)
                    {
                        case SmtpErrorCode.RecipientNotAccepted:
                            Console.WriteLine("\tRecipient not accepted: {0}", ex.Mailbox);
                            break;
                        case SmtpErrorCode.SenderNotAccepted:
                            Console.WriteLine("\tSender not accepted: {0}", ex.Mailbox);
                            break;
                        case SmtpErrorCode.MessageNotAccepted:
                            Console.WriteLine("\tMessage not accepted.");
                            break;
                    }
                }
                catch (SmtpProtocolException ex)
                {
                    sendStatus = false;

                    Console.WriteLine("Protocol error while sending message: {0}", ex.Message);
                }

                client.Disconnect(true);

                return sendStatus;

            });

			
        }
	}
}
