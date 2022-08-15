import axios from 'axios';
describe('Get a list of sentences from the API', () => {
  const baseUrl = 'http://localhost:3000';
  let response;
  let data;
  test('Should return a 200 and have a result', async () => {
    response = await axios.get(`${baseUrl}/api/sentences/`);
    expect(response.status).toBe(200);
    expect(response.data).toBeTruthy();
  });

  test(`Resutls must contains required fields include
        an array of 10 phrases`, async () => {
    expect(Array.isArray(response.data.data)).toBe(true);
    const { count, nextCursor } = response.data;
    ({ data } = response.data);
    expect(count).toBe(10);
    expect(nextCursor).toBeTruthy();
    expect(data.length).toBe(10);
  });
});

// describe('Posting a proposition of translation', () => {

test('Data Resulted should have no translation', async () => {
  ({ data } = response.data);
  const translation = data.includes((sentence) => sentence.translated_text);
  expect(translation).toBe(false);
});
//   const baseUrl = 'http://localhost:3000';
//   const sentence = {
//     idText_vo: '',
//     translated_text: 'This is a test sentence',
//   };
//   let response;
//   test('Should return a 200 and have a result', async () => {
//     response = await axios.post(
//       `${baseUrl}/api/untranslated/sentences/untranslated`,
//       sentence,
//     );
//     expect(response.status).toBe(200);
//     expect(response.data).toBeTruthy();
//   });
// });
