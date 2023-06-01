import { Transaction } from "../domain/transaction";

export type DetailTransaction = {
  idProduct: number;
  productName: string;
  price: number;
  qty: number;
};

export function DetailTransactionPage(
  dataDetailTransaction: Omit<Transaction, "id">,
  returnHomeFunction: () => void
) {
  return (
    <div>
      <input
        type="button"
        value="Back to Transaction Home"
        onClick={() => returnHomeFunction()}
      />
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {dataDetailTransaction.items.map(
            (item: DetailTransaction, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>{item.qty * item.price}</td>
                </tr>
              );
            }
          )}
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td colSpan={4} align="right">
              Total :
            </td>
            <td>{dataDetailTransaction.total}</td>
          </tr>
          <tr>
            <td colSpan={4} align="right">
              Payment :
            </td>
            <td>{dataDetailTransaction.payment}</td>
          </tr>
          <tr>
            <td colSpan={4} align="right">
              Return :
            </td>
            <td>{dataDetailTransaction.return}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
