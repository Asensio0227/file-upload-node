
function getElement(selection){
  const element = document.querySelector(selection);

  if (!element) {
    throw new Error(`Please check if ${selection} exist`)
  } 
  return element;
};

const url = '/api/v1/products';

const fileFormDOM = getElement(".file-form");
const containerDOM = getElement(".container");
const nameInputDOM= getElement('#name');
const priceInputDOM = getElement('#price');
const imageInputDOM = getElement('#image');

let imageValue;

imageInputDOM.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append('image', imageFile);
  try {
    const {
      data: {
        image: {
          src
        }
      }
    } = await axios.post(`${url}/uploads`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    imageValue = src;
  } catch (error) {
    imageValue = null;
    console.log(error);
  }
});

fileFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameValue = nameInputDOM.value;
  const priceValue = priceInputDOM.value;
  try {
    const products = {
      name: nameValue,
      price: priceValue,
      image:imageValue
    };
    await axios.post(url, products);
    fetchProducts();
  } catch (error) {
    console.log(error);
  }
})

async function fetchProducts() {
  try {
    const {
      data: {
        products
      }
    } = await axios.get(url);
    const productsDom = products.map((venom) => {
      return `
        <article class="product">
          <img src="${venom.image}" alt="${venom.name}" class="img"/>
          <footer>
            <p>
              ${venom.name}
            </p>
            <span>
              $${venom.price}
            </span>
          </footer>
        </article>
      `
    }).join('');
    containerDOM.innerHTML = productsDom;
  } catch (error) {
    console.log(error);
  }
};

fetchProducts();

