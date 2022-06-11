import { action, makeAutoObservable, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

interface CheckboxInterface {
  label: string;
  name: string;
  value: string;
  checked: boolean;
}

class CheckboxGroup {
  protected _boxes: {
    [key: string]: CheckboxInterface;
  };
  protected _values: Array<string>;

  public get boxes() {
    return this._boxes;
  }

  public get values() {
    return this._values;
  }

  constructor() {
    makeAutoObservable(this);
    this._boxes = {};
    this._values = [];
  }

  addCb(cb: CheckboxInterface) {
    this._boxes[cb.label] = cb;
  }

  addValue(value: string) {
    this._values.push(value);
  }

  removeValue(value: string) {
    this._values = this._values.filter((v) => v !== value);
  }

  render() {
    const el = () => {
      return (
        <div className="checkbox-group">
          {Object.entries(this._boxes).map(([key, cb]) => (
            <label key={cb.name}>
              {cb.label}
              <input
                type="checkbox"
                name={cb.name}
                value={this._boxes[key].value}
                onChange={(e) => {
                  const checked = e.currentTarget.checked;
                  const value = e.currentTarget.value;
                  if (checked) this.addValue(value);
                  if (!checked) this.removeValue(value);
                  action(() => {
                    delete this._boxes[key];
                  });
                }}
              />
            </label>
          ))}
        </div>
      );
    };

    return observer(el);
  }
}

export { CheckboxGroup };
