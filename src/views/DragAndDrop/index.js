import React from 'react'

import { StyledDnDContainer, StyledCanvasContainer, StyledDropZone, StyledTaskItem } from './styled-components';


class DragAndDrop extends React.Component {
  state = {
    tasks: this.props.tasks
  };

  categorizeTasks = tasks =>
    tasks.reduce((accum, curr) => {
        accum[curr.category] = [...accum[curr.category], {...curr}];
        return accum;
    }, { wip: [], complete: [] });

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData('id', id);
  };

  onDragOver = (ev, id) => {
    ev.preventDefault();
  };

  onDragEnter = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, category) => {
    const { tasks } = this.state;
    const id = ev.dataTransfer.getData('id');
    const updatedTasks = tasks.map(curr => curr.name === id ? {...curr, category } : { ...curr });

    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { tasks } = this.state;
    const categorizedTasks = this.categorizeTasks(tasks);

    return(
      <StyledDnDContainer>
        <h2>Drag And Drop Demo</h2>
        <StyledCanvasContainer onDragEnter={this.onDragEnter} onDragOver={this.onDragOver}>
          <StyledDropZone onDragEnter={this.onDragEnter} onDragOver={this.onDragOver} onDrop={e => this.onDrop(e, 'wip')}>
            <span>WIP</span>
            {
              categorizedTasks.wip.map(curr => (
                <StyledTaskItem
                  key={curr.name}
                  onDragStart={e => this.onDragStart(e, curr.name)}
                  onDragOver={e => this.onDragOver(e, curr.name)}
                  draggable
                  bgColor={curr.bgColor}
                >
                  <p>{curr.name}</p>
                </StyledTaskItem>
              ))
            }
          </StyledDropZone>
          <div style={{ width: '60%', textAlign: 'center' }}><p>THE CENTER</p></div>
          <StyledDropZone onDragEnter={this.onDragEnter} onDragOver={this.onDragOver} onDrop={e => this.onDrop(e, 'complete')}>
            <span>Complete</span>
            {
              categorizedTasks.complete.map(curr => (
                <StyledTaskItem
                  key={curr.name}
                  onDragStart={e => this.onDragStart(e, curr.name)}
                  onDragOver={e => this.onDragOver(e, curr.name)}
                  draggable
                  bgColor={curr.bgColor}
                >
                  <p>{curr.name}</p>
                </StyledTaskItem>
              ))
            }
          </StyledDropZone>
        </StyledCanvasContainer>
      </StyledDnDContainer>
    )
  }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
});

const fakeStoreInit = fakeStore => mapStateToProps => WrappedComponent => () => {
  const componentProps = mapStateToProps(fakeStore);
  return <WrappedComponent {...componentProps} />
};

const fakeStore = {
  tasks: [
    {
      name: "Angular",
      category: 'wip',
      bgColor: 'yellow',
      dragOver: false
    },
    {
      name: "React",
      category: 'wip',
      bgColor: 'pink',
      dragOver: false
    },
    {
      name: "Vue",
      category: 'complete',
      bgColor: 'skyblue',
      dragOver: false
    },
    {
      name: "jQuery",
      category: 'wip',
      bgColor: 'purple',
      dragOver: false
    },
    {
      name: "Java",
      category: 'wip',
      bgColor: 'blue',
      dragOver: false
    },
    {
      name: "Swift",
      category: 'wip',
      bgColor: 'red',
      dragOver: false
    }
  ]
};
const fConnect = fakeStoreInit(fakeStore);

export default fConnect(mapStateToProps)(DragAndDrop);


