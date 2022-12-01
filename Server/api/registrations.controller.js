import RegistrationDAO from "../dao/registrationDAO.js";

export default class RegistrationsController {
    static async apiPostRegistration(req, res, next) {
      try {
        const user = req.body.user
        const ID = req.body.id
        const phone = req.body.phone
        const email = req.body.email
        const mailingAddr = req.body.mailing_addr
        const billingAddr = req.body.billing_addr
  
        const RegistrationResponse = await RegistrationDAO.addRegistration(
            user,
            phone,
            email,
            mailingAddr,
            billingAddr
        )
        res.json({ status: "success" })
      } catch (e) {
        res.status(500).json({ error: e.message })
      }
    }
  }