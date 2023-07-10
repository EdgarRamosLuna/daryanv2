// import { render, fireEvent } from "@testing-library/react";
// import SecondTableCreate2 from "./SecondTableCreate2";

// // test('it renders without crashing', () => {
// //   const mockDivs = 
// //     { id: 1, values: Array(15).fill("") },
// //     { id: 2, values: Array(15).fill("") },
// //   ];
// //   const mockSetTotalesDefectos = jest.fn();
// //   const mockSetDivs = jest.fn();
// //Comprueba si se renderiza correctamente:
// //   render(<SecondTableCreate2 divs={mockDivs} setTotalesDefectos={mockSetTotalesDefectos} setDivs={mockSetDivs} />);
// // });
// // test('renders without crashing', () => {
// //   const mockDivs = [
// //     { id: 1, values: Array(15).fill("") }
// //   ];
// //   const mockSetTotalesDefectos = jest.fn();
// //   const mockSetDivs = jest.fn();

// //   render(<SecondTableCreate2 divs={mockDivs} setTotalesDefectos={mockSetTotalesDefectos} setDivs={mockSetDivs} />);
// // });
// //Verifica si se renderiza la cantidad correcta de filas de entrada:

// // test('renders the correct amount of input rows', () => {
// //   const mockDivs = [
// //     { id: 1, values: Array(15).fill("") },
// //     { id: 2, values: Array(15).fill("") },
// //   ];
// //   const mockSetTotalesDefectos = jest.fn();
// //   const mockSetDivs = jest.fn();

// //   render(<SecondTableCreate2 divs={mockDivs} setTotalesDefectos={mockSetTotalesDefectos} setDivs={mockSetDivs} />);

// //   const rows = screen.getAllByRole('row');
// //   expect(rows).toHaveLength(mockDivs.length + 1); // +1 for the header row
// // });

// //Prueba las interacciones del usuario con el componente:

// // test('handle input change correctly', () => {
// //   const mockDivs = [
// //     { id: 1, values: Array(15).fill("") },
// //   ];
// //   const mockSetTotalesDefectos = jest.fn();
// //   const mockSetDivs = jest.fn();

// //   const { container } = render(<SecondTableCreate2 divs={mockDivs} setTotalesDefectos={mockSetTotalesDefectos} setDivs={mockSetDivs} />);

// //   const inputElements = container.querySelectorAll('input');
// //   fireEvent.change(inputElements[0], { target: { value: '10' } });

// //   expect(mockSetDivs).toHaveBeenCalledTimes(1);
// // });

// //Prueba la función de agregar fila:
// test('handles add row correctly', () => {
//   const mockDivs = [
//     { id: 1, values: Array(15).fill("") }
//   ];
//   const mockSetTotalesDefectos = jest.fn();
//   const mockSetDivs = jest.fn();

//   render(<SecondTableCreate2 divs={mockDivs} setTotalesDefectos={mockSetTotalesDefectos} setDivs={mockSetDivs} />);
  
//   const addButton = screen.getByRole('button', {name: /Agregar Fila/i});
//   fireEvent.click(addButton);
  
//   expect(mockSetDivs).toHaveBeenCalledTimes(1);
// });
