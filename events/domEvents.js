import orderCards from '../pages/cards';
import {
  getSingleOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from '../api/orderData';
import showItems from '../pages/items';
import { itemForm } from '../components/forms/itemForm';
// import paymentForm from '../components/shared/paymentForm';

function domEvents(user) {
  document.querySelector('#homePage').addEventListener('click', (e) => {
    if (e.target.id.includes('update-entry')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((entry) => updateOrder(entry));
    }

    if (e.target.id.includes('delete-entry')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Do you want to delete this order?')) {
        console.warn('DELETE ORDER', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteOrder(firebaseKey).then(() => {
          getAllOrders(user.uid).then(orderCards);
        });
      }
    }
    if (e.target.id.includes('edit-entry')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleOrder(firebaseKey).then((entryObj) => updateOrder(entryObj));
    }
  });
  // item details page event //
  // document.querySelector('#homePage').addEventListener('click', (e) => {
  //   if (e.target.id.includes('detail-entry--')) {
  //     const [, firebaseKey] = e.target.id.split('--');
  //     getSingleOrder(firebaseKey)
  //       .then((obj) => {
  //         console.warn(obj);
  //         showItems(obj.items);
  //       });
  //   }
  // });
  // item details page event //
  document.querySelector('#homePage').addEventListener('click', (e) => {
    if (e.target.id.includes('detail-entry--')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then(showItems);
    }
  });
  // add item click event //
  document.querySelector('#homePage').addEventListener('click', (e) => {
    if (e.target.id.includes('addItemBtn')) {
      itemForm();
    }
  });
}

export default domEvents;
