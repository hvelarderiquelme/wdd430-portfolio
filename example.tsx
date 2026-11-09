function add(a: number, b: number): number{
    return a + b;
}

add(2,2);

// 1) Implicit any
function greet(name: string):string {//ASK aI ABOUT THIS function greet(name: string) vs function greet(name: string):string
  return `Hello, ${name.toUpperCase()}`;
}

greet("Horacio");

// 2) Wrong return type (return the proper type using the reduce function using the items array)
function total(items: number[]): number {
  return items.reduce((accumulator, current) => accumulator + current, 0);
}

total([23,53,19]);

// 3) Property does not exist on type
type Product = { id: number; title: string; price: number};
const p: Product = { id: 1, title: "Notebook", price: 12.45 };
console.log(p.price);

// 4) Unsafe union usage
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }else{
        console.log(id);
    }
  
}

printId("Horacio");

// 5) Optional property used without a check
type User = { name: string; email?: string };
function emailDomain(user: User) {
  return user.email?.split("@")[1];
}

emailDomain({name: "Horacio Velarde"});
emailDomain({name: "Horacio Velarde", email: "hvelarde@telus.net"});

interface CartItem {
  name?: string; // Optional name property for better readability
  price: number;  
  qty: number; // Expected to be a positive integer; 
}

interface CartSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export function formatCartTotal(items: CartItem[], taxRate: number) : CartSummary{
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * taxRate;
  return {
    subtotal,
    tax,
    total: subtotal + tax
  };
}