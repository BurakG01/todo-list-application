import TodoList from "../components/TodoList";

it("renders correctly", () => {
  const wrapper = shallow(
    <TodoList todos={[{_id:1,completed:false,task:"test"}]} deleteTodo={() => {}} updateTodo = {() => {}} />
  );

  expect(wrapper).toMatchSnapshot();
});

it("task correctly", () => {
  
    const wrapper = mount(
        <TodoList todos={[{_id:1,completed:false,task:"test"}]} deleteTodo={() => {}} updateTodo = {() => {}} />
    );
  
    const text = wrapper.find("ListGroupItem").text();
  
    expect(text).toEqual("test");
  });

  it("calls updateTodo", () => {
  
    const spy = sinon.spy();
  
    const wrapper = mount(
        <TodoList todos={[{_id:1,completed:false,task:"test"}]} updateTodo={spy} deleteTodo = {() => {}} />
    );
  
    wrapper
      .find("ListGroupItem")
      .first()
      .simulate("click");
  
    expect(spy.calledOnce).toBe(true);
  });

  it("calls deleteTodo", () => {
  
    const spy = sinon.spy();
  
    const wrapper = mount(
        <TodoList todos={[{_id:1,completed:false,task:"test"}]} updateTodo= {() => {}} deleteTodo ={spy} />
    );
  
    wrapper
      .find("FontAwesomeIcon")
      .first()
      .simulate("click");
  
    expect(spy.calledOnce).toBe(true);
  });