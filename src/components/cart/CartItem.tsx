import { ItemProduct } from "../../types/ItemProduct";
import Button from "@material-ui/core/Button";

type Props = {
  item: ItemProduct;
  addToCart: (clickedItem: ItemProduct) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  let picture = [];
  picture.push(item.picture);

  return (
    <div className="flex flex-jc-sb" style={{ padding: "1rem" }}>
      <img
        src={URL.createObjectURL(new Blob(picture, { type: "image/jpg" }))}
        alt={item.name}
        style={{ width: "3rem", height: "3rem" }}
      />
      <div>
        <h3>{item.name}</h3>
        <div className="information">
          <p>Precio: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
