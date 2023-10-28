import apiKey from './key/sheep-id-0c1307c53c46.json'


// Replace 'YOUR_API_KEY' with your actual API key


const key = 'AIzaSyDezYiPQqAt2UCC1VN4O8dsxezs_sgtYRA';

function searchImage(image: string) {
    console.log(image);
    fetch(`https://vision.googleapis.com/v1/images:annotate?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
               content: image
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION',
              },
            ],
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data here
        console.log(data);
        return data;
      })
      .catch((error) => {
        // Handle API request errors
        console.error(error);
      });
}

export default searchImage;
