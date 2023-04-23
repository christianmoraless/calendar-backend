const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  return res.json({
    ok: true,
    events,
  });
};

const createEvents = async (req, res = response) => {
  const event = new Event(req.body);
  console.log(req.body);
  try {
    event.user = req.uid;
    const eventSaved = await event.save();
    return res.json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: true,
      msg: "Check the server logs",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    // if (event.user.toString !== uid) {
    //   return res.status(401).json({
    //     ok: false,
    //     msg: "You have no privileges",
    //   });
    // }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "check the logs server",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    // if (event.user.toString !== uid) {
    //   return res.status(401).json({
    //     ok: false,
    //     msg: "You have no privileges",
    //   });
    // }
    const id = req.params.id;
    await Event.findByIdAndDelete(id);

    if (event) {
      return res.json({
        ok: true,
        msg: "Event deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      msg: "check the logs server",
    });
  }
  return res.json({
    ok: true,
    msg: "delete",
  });
};

module.exports = {
  getEvents,
  createEvents,
  updateEvent,
  deleteEvent,
};
