const errorMessages = {
  mixed: {
    required: "تکمیل این گزینه الزامی است",
  },
  string: {
    somethingWentWrong: "مشکلی پیش آمده لطفا بعدا تلاش کنید.",
    passwordConfirmation: "گذرواژه ها باید با هم یکسان باشند.",
    email: "این گزینه آدرس یک ایمیل صحیح باشد.",
    min: "این گزینه باید حداقل ${min} کارکتر داشته باشد.",
    max: "این گزینه باید حداکثر ${max} کارکتر داشته باشد.",
    hexColor: "این گزینه رنگ صحیح نیست.",
    slug: "این گزینه نام خاص صحیح نیست.",
    length: "این گزینه باید ${length} کارکتر باشد.",
  },
  number: {
    message: "فقط عدد قابل قبول است .",
    min: "این گزینه باید حداقل ${min} باشد.",
    max: "این گزینه نباید بزرگتر از ${max} باشد.",
    length: "این گزینه نباید بیشتر از ${length} کاراکتر باشد.",
  },
} as const;

export default errorMessages;
