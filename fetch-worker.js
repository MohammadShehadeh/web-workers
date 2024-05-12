onmessage = async function (e) {
  console.log("fetch Worker: Message received from main script");

  try {
    const response = await this.fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const result = await response.json();
    postMessage(result);
  } catch (error) {
    console.error("Something went wrong!::", error);
    postMessage(error);
  }
};
