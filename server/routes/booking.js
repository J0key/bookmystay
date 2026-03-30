const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")
const auth = require("../middleware/auth")


// create a new booking
router.post("/", async (req, res) => {
    try {
        const { listingId, checkIn, checkOut } = req.body
        const booking = new Booking({
            listingId,
            userId: req.user.id,
            checkIn,
            checkOut
        });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error creating booking" })
    }
})

// get booking
router.get("/my-bookings", auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate("listingId")
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking" })
    }
})

// get booking by Id
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("listingId")
        if (!booking) return res.json(404).json({ message: "booking not found" })
        if (booking.userId.toString() !== req.user.id) 
            return res.status(403).json({message: "Unauthorized"})
        res.json(booking)
    } catch (error) {
        res.status(500).json({message: "error fetching booking"})
    }
})

// update the booking
router.put("/:id", auth, async(req,res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        if(!booking) return res.status(404).json({message: "Booking not found"})
        if(booking.userId.toString() !== req.user.id) 
            return res.status(403).json({message: "Unauthorized"})

        const {checkIn, checkOut} = req.body
        booking.checkIn = checkIn || booking.checkIn
        booking.checkOut = checkOut || booking.checkOut
        
        await booking.save()
        res.json(booking)
    } catch (error) {
        res.status(500).json({message:"Error updating bookings"})    
    }
})

// delete booking
router.delete("/:id", auth, async(res,req) => {
    try {
        const booking = await Booking.findById(req.params.id)
        if (!booking) return res.status(404).json({message: "Booking not found"})
        if(booking.userId.toString() !== req.user.id)
            return res.status(403).json({message: "Unauthorized"})

        await booking.deleteOne()
        res.json({message: "Deleted Booking Succesfully"})        
    } catch (error) {
        res.status(500).json({message: "Error delete bookings"})        
    }
})


module.exports = router