import mongoose, { ValidatorProps } from "mongoose";

const PhonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "The name must have at least 3 characters"],
  },
  number: {
    type: String,
    required: true,
    minLength: [8, "Phone number must have at least 8 characters"],
    validate: {
      validator: (v: string) => {
        return /([\d]{2,3})-([\d]+)/.test(v);
      },
      message: (props: ValidatorProps) =>
        `${props.value} is not a valid phone number`,
    },
  },
});

const Phonebook = mongoose.model("phonebook", PhonebookSchema);

const createPhoneBook = async ({
  name,
  number,
}: {
  name: string;
  number: string;
}) => {
  const phonebook = await new Phonebook({
    name,
    number,
  }).save();

  console.log(`Added ${name} number ${number} to phonebooks`);

  return phonebook.toObject();
};

const getAllPhonebooks = async () => {
  return await Phonebook.find({});
};

const findPhonebookById = async (id: string) => {
  return await Phonebook.findById(id);
};

const findPhonebookByName = async (name: string) => {
  return await Phonebook.findOne({
    name,
  });
};

const updatePhonebook = async (
  id: string,
  {
    name,
    number,
  }: {
    name: string;
    number: string;
  }
) => {
  return await Phonebook.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' });
};

const deletePhonebookById = async (id: string) => {
  return await Phonebook.findOneAndDelete({ _id: id });
};

const countTotalPhonebook = async () => {
  return await Phonebook.countDocuments({});
};

export {
  createPhoneBook,
  getAllPhonebooks,
  findPhonebookById,
  findPhonebookByName,
  deletePhonebookById,
  updatePhonebook,
  countTotalPhonebook,
};
