import LoginForm from "./LoginForm";

const LoginPage =  () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("jwtToken")?.value;
  // if (token) {
  //   redirect("/");
  // }

  return (
    <section className="fix-height container m-auto px-3 sm:px-7  flex items-center justify-center">
      <div className="bg-white m-auto p-5 rounded-lg  w-full md:w-2/3">
        <h1 className="text-2xl  md:text-3xl font-bold text-gray-800 mb-5">Login </h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
