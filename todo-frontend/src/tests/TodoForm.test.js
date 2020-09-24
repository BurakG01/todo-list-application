import TodoForm from "../components/TodoForm";


it("renders correctly", () => {
  const wrapper = shallow(
    <TodoForm setTodo={() => {}} createTodo={() => {}} />
  );

  expect(wrapper).toMatchSnapshot();
});

it("calls createTodo", () => {
  const spy = sinon.spy();

  const wrapper = mount(<TodoForm setTodo={() => {}} createTodo={spy} />);

  wrapper.find("Button").first().simulate("click");

  expect(spy.calledOnce).toBe(true);
});

it("calls setTodo", () => {
  const spy = sinon.spy();

  const wrapper = mount(<TodoForm setTodo={spy} createTodo={() => {}} />);

  wrapper.find("FormControl").first().simulate("change");

  expect(spy.calledOnce).toBe(true);
});
