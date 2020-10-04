import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FcPlus } from "react-icons/fc";
import { FaMinusCircle } from "react-icons/fa";
import { MobileView, isMobile } from "react-device-detect";
const EditableTable = ({ index, thead, SetData, style, dataAvailable }) => {
  const [isDesc, SetDesc] = useState({
    set: dataAvailable[0],
    reps: dataAvailable[1],
    weight: dataAvailable[2],
  });
  Number.prototype[Symbol.iterator] = function* (i = 0) {
    while (i < this) {
      yield i++;
    }
  };
  const [isSetRange, UpdateSetRange] = useState([...100]);
  const [isRepsRange, SetRepsRange] = useState([...200]);
  const [isWeightRange, SetWeightRange] = useState([...2000]);

  useEffect(() => {
    SetData({
      set: isDesc.set,
      reps: isDesc.reps,
      weight: isDesc.weight,
    });
  }, [isDesc]);
  let theadArr = [];
  for (let key in thead) {
    if (thead.hasOwnProperty(key)) {
      theadArr.push(<th key={key}>{thead[key]}</th>);
    } else {
      theadArr.push(<th key={key}>{key}</th>);
    }
  }

  const handleDelete = (e, idx) => {
    e.preventDefault();
    if (isDesc.set.length > 1) {
      let newIndexArr = [];
      isDesc.set.forEach((el, index) => {
        if (index > idx) {
          newIndexArr.push(el - 1);
        }
      });
      SetDesc({
        set: [...isDesc.set.slice(0, idx), ...newIndexArr],
        reps: [...isDesc.reps.slice(0, idx), ...isDesc.reps.slice(idx + 1)],
        weight: [
          ...isDesc.weight.slice(0, idx),
          ...isDesc.weight.slice(idx + 1),
        ],
      });
    } else {
      SetDesc({
        set: [...isDesc.set.slice(0, idx), ...isDesc.set.slice(idx + 1)],
        reps: [...isDesc.reps.slice(0, idx), ...isDesc.reps.slice(idx + 1)],
        weight: [
          ...isDesc.weight.slice(0, idx),
          ...isDesc.weight.slice(idx + 1),
        ],
      });
    }
  };

  return (
    <div>
      <Table
        responsive
        striped
        borderless
        variant={"dark"}
        style={style !== undefined ? style : { color: "white" }}
        onChange={() => {
          SetData({
            set: isDesc.set,
            reps: isDesc.reps,
            weight: isDesc.weight,
          });
        }}
      >
        <thead className="thead-dark">
          <tr id="table-thead-tr">
            <th />
            {theadArr}
          </tr>
        </thead>
        <tbody>
          {isDesc.set.map((el, idx) => {
            return (
              <tr key={"set-row" + idx}>
                <td>
                  <button
                    style={{
                      borderRadius: "10vw",
                      background: "none",
                      borderStyle: "hidden",
                    }}
                    onClick={(e) => handleDelete(e, idx)}
                  >
                    <FaMinusCircle size={"1em"} style={{ color: "red" }} />
                  </button>
                </td>
                <>
                  <td>
                    <input
                      type={"number"}
                      key={`set-content-${idx}`}
                      style={{
                        width: "8vw",
                      }}
                      value={isDesc.set[idx]}
                      onClick={(e) => {
                        if (isMobile) {
                          document.querySelector(`#set-${idx}`).click();
                        }
                      }}
                      onChange={(e) => {
                        let val = e.target.value;
                        val =
                          val < isSetRange[0]
                            ? isSetRange[0]
                            : val >= isSetRange[isSetRange.length - 1]
                            ? isSetRange[isSetRange.length - 1]
                            : val;
                        SetDesc({
                          set: [
                            ...isDesc.set.slice(0, idx),
                            Number(val),
                            ...isDesc.set.slice(idx + 1),
                          ],

                          reps: isDesc.reps,
                          weight: isDesc.weight,
                        });
                      }}
                      list={"set"}
                    />
                    <MobileView>
                      <datalist id={`set-${idx}`}>
                        {isSetRange.map((el) => {
                          return <option value={el}></option>;
                        })}
                      </datalist>
                    </MobileView>
                  </td>
                </>
                <>
                  <td>
                    <input
                      key={`workout-desc-${idx}`}
                      type="number"
                      step="5.0"
                      min={`${isRepsRange[0]}`}
                      max={`${isRepsRange[isRepsRange.length - 1]}`}
                      style={{
                        input: {
                          color: "blue",
                        },
                        width: "8vw",
                      }}
                      placeholder={isDesc.reps[idx]}
                      value={isDesc.reps[idx]}
                      onClick={(e) => {
                        if (isMobile) {
                          document.querySelector(`#reps-${idx}`).click();
                        }
                      }}
                      onChange={(e) => {
                        let val = e.target.value;
                        val =
                          val < isRepsRange[0]
                            ? isRepsRange[0]
                            : val >= isRepsRange[isRepsRange.length - 1]
                            ? isRepsRange[isRepsRange.length - 1]
                            : val;
                        SetDesc({
                          set: isDesc.set,
                          reps: [
                            ...isDesc.reps.slice(0, idx),
                            Number(val),
                            ...isDesc.reps.slice(idx + 1),
                          ],
                          weight: isDesc.weight,
                        });
                      }}
                      list={"reps"}
                    />
                    <MobileView>
                      <datalist id={`reps-${idx}`}>
                        {isRepsRange.map((el) => {
                          return <option value={el}></option>;
                        })}
                      </datalist>
                    </MobileView>
                  </td>
                </>
                <>
                  <td>
                    <input
                      key={`workout-desc-${idx}`}
                      type="number"
                      step="5.0"
                      min={`${isWeightRange[0]}`}
                      max={`${isWeightRange[isWeightRange.length - 1]}`}
                      style={{
                        input: {
                          color: "green",
                        },
                        width: "8vw",
                      }}
                      placeholder={isDesc.weight[idx]}
                      value={isDesc.weight[idx]}
                      onClick={(e) => {
                        if (isMobile) {
                          document.querySelector(`#weight-${idx}`).click();
                        }
                      }}
                      onChange={(e) => {
                        let val = e.target.value;
                        val =
                          val < isWeightRange[0]
                            ? isWeightRange[0]
                            : val >= isWeightRange[isWeightRange.length - 1]
                            ? isWeightRange[isWeightRange.length - 1]
                            : val;

                        SetDesc({
                          set: isDesc.set,
                          reps: isDesc.reps,
                          weight: [
                            ...isDesc.weight.slice(0, idx),
                            Number(val),
                            ...isDesc.weight.slice(idx + 1),
                          ],
                        });
                      }}
                      list={"weight"}
                    />
                    <MobileView>
                      <datalist id={`weight-${idx}`}>
                        {isWeightRange.map((el) => {
                          return <option value={el}></option>;
                        })}
                      </datalist>
                    </MobileView>
                  </td>
                </>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <hr />
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            margin: "auto",
            borderRadius: "10vw",
            background: "none",
            borderStyle: "hidden",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (isDesc.set.length > 0) {
              SetDesc({
                set: [...isDesc.set, isDesc.set.slice(-1)[0] + 1],
                reps: [...isDesc.reps, isDesc.reps.slice(-1)[0]],
                weight: [...isDesc.weight, isDesc.weight.slice(-1)[0]],
              });
            } else {
              SetDesc({
                set: [...isDesc.set, 1],
                reps: [...isDesc.reps, 5],
                weight: [...isDesc.weight, 5],
              });
            }
          }}
        >
          <FcPlus size={"2em"} />
        </button>
      </div>
    </div>
  );
};
export default EditableTable;
