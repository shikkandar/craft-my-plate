import { useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const menu = [
  {
    name: "Starters",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwA5E9LED70gvToBV0lsV2ngZRHLX9nNDU2Q&s",
    items: [
      {
        name: "Spring Rolls",
        des: "Crispy fried paneer",
        image:
          "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe-500x375.jpg",
      },
      {
        name: "Samosa",
        des: "Crispy fried paneer",
        image:
          "https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg",
      },
      {
        name: "Paneer Tikka",
        des: "Crispy fried paneer",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt2d_HAe-gzlrg5BU_VSys9LHVb2yi2qgYQQ&s",
      },
      {
        name: "Chicken Wings",
        des: "Crispy fried paneer",
        image:
          "https://www.allrecipes.com/thmb/AtViolcfVtInHgq_mRtv4tPZASQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-187822-baked-chicken-wings-4x3-5c7b4624c8554f3da5aabb7d3a91a209.jpg",
      },
    ],
  },
  {
    name: "Biryani",
    image:
      "https://nikaabriyani.com/public/images/home/about-us-briyani-bg.png",
    items: [
      {
        name: "Chicken Biryani",
        des: "Crispy fried paneer",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmVkyPTWaOVG4zol7w-D5l2a4G868dBMhfrg&s",
      },
      {
        name: "Mutton Biryani",
        des: "Crispy fried paneer",
        image:
          "https://spiceeats.com/wp-content/uploads/2020/07/Mutton-Biryani.jpg",
      },
      {
        name: "Veg Biryani",
        des: "Crispy fried paneer",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisPmikxtyKe5ypu93a5iIVN4FvrmaP3t6cg&s",
      },
      {
        name: "Paneer Biryani",
        des: "Crispy fried paneer",
        image:
          "https://revi.b-cdn.net/wp-content/uploads/2017/01/paneer-biryani-1.jpg",
      },
    ],
  },
  {
    name: "Beverages",
    image: "https://nawon.com.vn/wp-content/uploads/2024/01/soft-drinks.jpg",
    items: [
      {
        name: "Coke",
        des: "Crispy fried paneer",
        image:
          "https://www.beveragedaily.com/resizer/v2/DI3XSD7TIVI6TP56HGFBGHDU3Y.jpg?auth=37062fb582fe655deea0bd9c06c5d7408eade45ddc383a3af45c9453765c2e5a",
      },
      {
        name: "Lemonade",
        des: "Crispy fried paneer",
        image:
          "https://oliveoilsfromspain.org/wp-content/uploads/2021/03/healthy-lemonade.jpg",
      },
      {
        name: "Mango Lassi",
        des: "Crispy fried paneer",
        image:
          "https://www.anediblemosaic.com/wp-content/uploads//2021/09/mango-lassi-featured-image.jpg",
      },
      {
        name: "Iced Tea",
        des: "Crispy fried paneer",
        image:
          "https://www.nestleprofessional.in/sites/default/files/2021-08/Masala-Iced-Tea_1.jpg",
      },
    ],
  },
];

const Main = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index: any) => {
    setSelectedIndex(index);
  };

  type CartItem = {
    name: string;
    des: string;
    image: string;
    quantity: number;
  };

  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAdd = (data: { name: string; des: string; image: string }) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.name === data.name
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...data, quantity: 1 }];
      }
    });
  };

  const handleUpdate = (data: CartItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === data.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDelete = (data: { name: string }) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === data.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const itemToRemove = updatedCart.find((item) => item.name === data.name);

      if (itemToRemove && itemToRemove.quantity <= 0) {
        const confirmDelete = window.confirm(
          `Are you sure you want to completely remove "${data.name}" from the cart?`
        );

        if (confirmDelete) {
          return updatedCart.filter((item) => item.quantity > 0);
        } else {
          return prevCart;
        }
      }

      // Return updated cart if no item is removed
      return updatedCart;
    });
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center p-4 ">
      {/* Search Input */}
      <div>
        <TextField
          variant="outlined"
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#5000A2" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5000A2",
              },
              "&:hover fieldset": {
                borderColor: "#5000A2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5000A2",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#5000A2",
              opacity: 1,
            },
            "& .MuiInputBase-input": {
              color: "#5000A2",
            },
          }}
        />
        {menu.map((item, i) => (
          <div
            key={i}
            onClick={() => handleItemClick(i)}
            className={`flex items-center mb-4 mt-3 p-2 rounded cursor-pointer ${
              selectedIndex === i
                ? "bg-[#EFDEFF] text-[#5000A2]"
                : "hover:bg-gray-200"
            }`}
          >
            <img src={item.image} alt={item.name} className="w-6 h-6 mr-3 rounded" />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Other Elements */}
      <div className="">
        <TextField
          variant="outlined"
          placeholder="Search"
          className="w-[100%]"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "#5000A2" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5000A2",
              },
              "&:hover fieldset": {
                borderColor: "#5000A2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5000A2",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#5000A2",
              opacity: 1,
            },
            "& .MuiInputBase-input": {
              color: "#5000A2",
            },
          }}
        />
        <div className="w-[60vw] flex flex-wrap gap-3 justify-between mt-3">
          {menu.map((item) => (
            <>
              {item?.items?.map((data, i) => (
                <div key={i} className="flex items-center gap-5 p-5">
                  <img
                    src={data.image}
                    alt={data.name}

                    className="w-20 h-20 rounded"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-xl">{data.name}</p>
                    <p className="text-gray-600">{data.des}</p>
                    <div>
                      <Button
                        sx={{
                          borderColor: "#5000A2",
                          color: "#5000A2",
                        }}
                        size="small"
                        variant="outlined"
                        onClick={() => handleAdd(data)}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
      <div className="p-2 flex flex-col xl:w-[20vw] w-[90%] h-[60vh] gap-3 ">
        <h2 className="text-3xl text-center text-[#5000A2]">platter items</h2>
        <div>
          <p className="text-xl mt-3">Items</p>
        </div>
        <div>
          {cart.map((data, i) => (
            <div key={i} className="flex justify-between mt-2 gap-5">
              <img src={data.image} alt={data.name} className="w-10 h-10 rounded" />
              <p>{data.name}</p>
              <div className="flex gap-1">
                <p
                  className="cursor-pointer"
                  onClick={() => handleDelete(data)}
                >
                  -
                </p>
                <p>{data.quantity}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => handleUpdate(data)}
                >
                  +
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button
          sx={{
            backgroundColor: "#5000A2",
          }}
          size="small"
          variant="contained"
        >
          Confirm Plater
        </Button>
      </div>
    </div>
  );
};

export default Main;
