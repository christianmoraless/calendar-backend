const { Schema, model } = require("mongoose");

const EnventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

EnventSchema.method("toJSON", function () {
  const { _id, __v, ...object } = this.toObject();
  Object.id = _id;
  return object;
});

module.exports = model("Evento", EnventSchema);
