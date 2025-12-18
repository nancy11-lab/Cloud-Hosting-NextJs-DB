import RegisterForm from "./RegisterForm";

const RegisterPage =  () => {
  return (
    <section className="fix-height container m-auto px-3 sm:px-7 flex items-center justify-center">
      <div className="bg-white m-auto p-5 rounded-lg  w-full md:w-2/3">
        <h1 className="text-2xl  md:text-3xl font-bold text-gray-800 mb-5">
          Create New Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
