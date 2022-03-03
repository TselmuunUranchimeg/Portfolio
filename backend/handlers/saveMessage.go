package handlers

import (
	"encoding/json"
	"fmt"
	"log"
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
	resStatus := http.StatusOK
	if sendErr != nil || sendRes.StatusCode >= 300 {
		if sendErr != nil {
			log.Println(sendErr)
		}
		log.Println(sendRes)
		res = Response{
			Subject: "Oops",
			Message: "Something went wrong with the server, please try again few minutes later.",
		}
		resStatus = http.StatusInternalServerError
	}
	byteData, marshalErr := json.Marshal(&res)
	if marshalErr != nil {
		rw.WriteHeader(http.StatusBadRequest)
		rw.Write([]byte("Can't get response!!!"))
		fmt.Println(marshalErr)
		return
	}
	rw.WriteHeader(resStatus)
	rw.Write(byteData)
}
