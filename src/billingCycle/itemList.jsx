import React, { Component } from "react";
import { Field, arrayInsert, arrayRemove } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "../common/layout/grid";
import Input from "../common/form/input";
import If from "../common/operator/if";

class ItemList extends Component {
  addInput(index, item = {}) {
    if (!this.props.readOnly) {
      this.props.arrayInsert("billingCycleForm", this.props.field, index, item);
    }
  }

  removeInput(index) {
    if (!this.props.readOnly && this.props.list.length > 1) {
      this.props.arrayRemove("billingCycleForm", this.props.field, index);
    }
  }

  renderRows() {
    const list = this.props.list || [];
    return list.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <Field
              name={`${this.props.field}[${index}].name`}
              component={Input}
              placeholder={this.props.namePlaceholder}
              readOnly={this.props.readOnly}
            />
          </td>
          <td>
            <Field
              name={`${this.props.field}[${index}].value`}
              component={Input}
              placeholder={this.props.valuePlaceholder}
              readOnly={this.props.readOnly}
            />
          </td>
          <If test={this.props.showStatus}>
            <td>
              <Field
                name={`${this.props.field}[${index}].status`}
                component={Input}
                placeholder={this.props.statusPlaceholder}
                readOnly={this.props.readOnly}
              />
            </td>
          </If>
          <td>
            <button
              type="button"
              className="btn btn-success small"
              onClick={() => this.addInput(index + 1)}
            >
              <i className="fa fa-plus"></i>
            </button>
            <button
              type="button"
              className="btn btn-warning small"
              onClick={() => this.addInput(index + 1, item)}
            >
              <i className="fa fa-clone"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger small"
              onClick={() => this.removeInput(index)}
            >
              <i className="fa fa-trash-o"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Grid cols={this.props.cols}>
        <fieldset>
          <legend>{this.props.legend}</legend>
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <If test={this.props.showStatus}>
                  <th>Status</th>
                </If>
                <th className="table-actions">Ações</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </fieldset>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ arrayInsert, arrayRemove }, dispatch);

export default connect(null, mapDispatchToProps)(ItemList);
