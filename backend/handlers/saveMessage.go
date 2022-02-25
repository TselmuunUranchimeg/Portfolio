package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type Note struct {
	Email   string `json:"email" validate:"required,email"`
	Message string `json:"message" validate:"required"`
}
type Response struct {
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func SaveMessage(rw http.ResponseWriter, r *http.Request) {
	body := Note{}
	if decodeErr := DecodeReqBody(&body, r, rw); decodeErr != nil {
		return
	}
	from := mail.NewEmail("Dummy account", "marstheundefeated@gmail.com")
	to := mail.NewEmail("Account to record messages", "tselmuunu@yahoo.com")
	subject := fmt.Sprintf("Client message from %s", body.Email)
	textContent := fmt.Sprintf("Email:\n%s\n\nMessage:\n%s", body.Email, body.Message)
	message := mail.NewSingleEmail(from, subject, to, textContent, "")
	client := sendgrid.NewSendClient(os.Getenv("SENDGRIDKEY"))
	sendRes, sendErr := client.Send(message)
	res := Response{
		Subject: "Success",
		Message: "Successfully sent the message, will contact you within 24 hours.",
	}
	rw.WriteHeader(http.StatusOK)
	if sendErr != nil || sendRes.StatusCode >= 300 {
		res = Response{
			Subject: "Oops",
			Message: "Something went wrong with the server, please try again few minutes later.",
		}
		rw.WriteHeader(http.StatusInternalServerError)
	}
	byteData, marshalErr := json.Marshal(&res)
	if marshalErr != nil {
		fmt.Println(marshalErr)
	}
	rw.Write(byteData)
}
