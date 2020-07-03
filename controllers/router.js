// Map routes to controller functions
export default function (router) {
  router.get("/error", function (req, resp) {
    throw new Error("Derp. An error occurred.");
  });
}
