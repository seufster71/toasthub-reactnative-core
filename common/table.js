import React from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import OrderBy from './order-by';
import Search from './search';
import SearchBy from './search-by';
import Pagination from './pagination';
import moment from 'moment';

const Table = ({itemState, header, columns, labelGroup, appPrefs, parent, onListLimitChange, onSearchClick, onSearchChange, 
	onPaginationClick, onOrderBy, onHeader, onOption, moveSelectedItem, moveHeader}) => {
		
	
	let tableHeader = "";
	let tableRows = [];

	// Create headers
	if (columns != null && columns.length > 0) {
		let tableHeaders = [];
		//  tableHeaders.push(<th key={0} scope="col">#</th>);

		for (let c = 0; c < columns.length; c++) {
			if (columns[c].optionalParams != null) {
				let opt = JSON.parse(columns[c].optionalParams);
				if (opt.conditionParent != null && opt.conditionParent == "NotNull" && (parent == null || parent == "")) {
					continue;
				} else if (opt.conditionField != null && opt.conditionField === "moveSelectedItem"  && opt.conditionCheck == "NotNull" && (moveSelectedItem == null || moveSelectedItem == "")) {
					continue;
				}
			}
			if (labelGroup != null && labelGroup != "" ) {
				if (columns[c].group == labelGroup) {
					tableHeaders.push(<th key={columns[c].id} scope="col">{columns[c].value}</th>);
				}
			} else {
				tableHeaders.push(<th key={columns[c].id} scope="col">{columns[c].value}</th>);
			}
		}
		tableHeader = <thead><tr>{tableHeaders}</tr></thead>;
	}
	
	// fill table
	if (itemState != null && itemState.items != null && itemState.items.length > 0) {
		for (let i = 0; i < itemState.items.length; i++) {
			let cells = [];
			//cells.push(<th key={0} scope="row">{i + 1}</th>);
			for (let c = 0; c < columns.length; c++) {
				if (columns[c].optionalParams != null) {
					let opt = JSON.parse(columns[c].optionalParams);
					let value = "";
					if (opt.conditionParent != null && opt.conditionParent == "NotNull" && (parent == null || parent == "")) {
						continue;
					} else if (opt.conditionField != null && opt.conditionField === "moveSelectedItem"  && opt.conditionCheck == "NotNull" && (moveSelectedItem == null || moveSelectedItem == "")) {
						continue;
					}
					
					if (opt.field != null) {
						value = itemState.items[i][opt.field];
						if (opt.prefix != null) {
							value = opt.prefix + value;
						}
					} else if (opt.fieldML != null) {
						if (itemState.items[i][opt.fieldML].langTexts != null && itemState.items[i][opt.fieldML].langTexts.length > 0){
							let match = false;
							for(let j = 0; j < itemState.items[i][opt.fieldML].langTexts.length; j++) {
								if (itemState.items[i][opt.fieldML].langTexts[j].lang == appPrefs.lang) {
									value = itemState.items[i][opt.fieldML].langTexts[j].text;
									match = true;
									break;
								}
							}
							if (!match) {
								value = itemState.items[i][opt.fieldML].defaultText;
							}
						} else {
					    	value = itemState.items[i][opt.fieldML].defaultText;
					    }

					} else if (opt.fieldBool != null) {
						if (itemState.items[i][opt.fieldBool] == true) {
							if (opt.labelTrue != null && opt.labelTrue[appPrefs.lang] != null) {
								value = opt.labelTrue[appPrefs.lang];
							} else {
								value = opt.labelTrue.defaultText;
							}
						} else {
							if (opt.labelFalse != null && opt.labelFalse[appPrefs.lang] != null) {
								value = opt.labelFalse[appPrefs.lang];
							} else {
								value = opt.labelFalse.defaultText;
							}
						}
					} else if (opt.fieldIcon != null) {
						value = [];
						if (onOption != null) {
							for(let j = 0; j < opt.fieldIcon.length; j++) {
								let lockField = false;
								if (opt.fieldIcon[j].lock != null && opt.fieldIcon[j].lock != "") {
									if (opt.fieldIcon[j].fieldLockObj != null && opt.fieldIcon[j].fieldLockObj != "") {
										if(itemState.items[i][opt.fieldIcon[j].fieldLockObj] != null) {
											lockField = itemState.items[i][opt.fieldIcon[j].fieldLockObj][opt.fieldIcon[j].lock];
										} else {
											lockField = false;
										}
									} else {
										lockField = itemState.items[i][opt.fieldIcon[j].lock];
									}
								}
								if (lockField == true) {
									// do nothing
								} else {
									value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={() => onOption(opt.fieldIcon[j].code,itemState.items[i])} aria-hidden="true"/>);
								}
								
							}
						}
					} else if (opt.fieldObj != null){
						if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.field != null) {
							if (itemState.items[i][opt.fieldObj.field] != null) {
								value = itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.field];
							}
						} else if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.fieldDate != null) {
							if (itemState.items[i][opt.fieldObj.field] != null) {
								value = new Intl.DateTimeFormat('en-US',{
				            		year: 'numeric', month: 'numeric', day: 'numeric'
				            	}).format(moment(itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldDate]).toDate());
							}
						} else if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.fieldBool != null) {
							if (itemState.items[i][opt.fieldObj.field] != null) {
								if (itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldBool] == true) {
									value = "Active";
								} else {
									value = "Disabled";
								}
							}
						} else if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.fieldML != null) {
							if (itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts != null && itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts.length > 0){
								let match = false;
								for(let j = 0; j < itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts.length; j++) {
									if (itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts[j].lang == appPrefs.lang) {
										value = itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts[j].text;
										match = true;
										break;
									}
								}
								if (!match) {
									value = itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].defaultText;
								}
							} else {
								value = itemState.items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].defaultText;
							}
						} else {
							value = itemState.items[i][opt.fieldObj.field];
						}
					} else if (opt.fieldJSON != null) {
						value = [];
						if (itemState.items[i][opt.fieldJSON] != null && itemState.items[i][opt.fieldJSON] != "") {
							let list = JSON.parse(itemState.items[i][opt.fieldJSON]);
							for (let j = 0; j < list.length; j++) {
								value.push(<div key={j}>{list[j]}</div>);
							}
						}
					} else if (opt.fieldJoin != null) {
						var myVal = "";
						for (let j = 0; j < opt.fieldJoin.length; j++) {
							if (j > 0 && opt.joinSeparator != null) {
								myVal = myVal + opt.joinSeparator;
							}
							if (opt.fieldJoin[j].field != null) {
								myVal = myVal + itemState.items[i][opt.fieldJoin[j].field];
							}
						}
						if (opt.prefix != null) {
							value = opt.prefix + myVal;
						} else {
							value = myVal;
						}
						
					}
					if (labelGroup != null && labelGroup != "" ) {
						if (columns[c].group == labelGroup) {
							cells.push(
									<td key={columns[c].id}>{value}</td>
							);
						}
					} else {
						cells.push(
								<td key={columns[c].id}>{value}</td>
						);
					}
				} // for inner 
			} // for outer
			if (moveSelectedItem != null && itemState.items[i].id == moveSelectedItem.id) {
				tableRows.push( <tr key={itemState.items[i].id} style={{background:"#FFFFCC"}}>{cells}</tr> );
			} else {
				tableRows.push( <tr key={itemState.items[i].id} >{cells}</tr> );
			}
			
		}
	} else {
		tableRows.push(<tr key="1"><td id={appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</td></tr>);
	}
	let tableBody = <tbody>{tableRows}</tbody>;

	return (
		<div className="col-md-12 col-sm-12 col-xs-12">
			<div className="x_panel">
				<div className="x_title">
					{header}
					<ul className="navbar-right panel_toolbox">
						<li><i className="fa fa-plus" title="Add" onClick={() => onOption("MODIFY")}/></li>
					</ul>
				</div>
				<div className="x_content">
					<div className="row">
						<ShowEntries name={itemState.pageName+"-LISTLIMIT"} appPrefs={appPrefs} listLimit={itemState.listLimit} onListLimitChange={onListLimitChange}/>
						{moveSelectedItem != null
						? <span style={{background:"#FFFFCC"}}>{moveHeader}</span>
						: <OrderBy itemState={itemState} name={itemState.pageName+"-ORDERBY"} appPrefs={appPrefs} columns={columns} parent={parent} onOrderBy={onOrderBy}/>
						}
						{moveSelectedItem != null ? <span></span>
						:<SearchBy itemState={itemState} name={itemState.pageName+"-SEARCHBY"} appPrefs={appPrefs} columns={columns} parent={parent} onClick={onSearchClick}/>
						}
						{moveSelectedItem != null ? <span></span>
						:<Search name={itemState.pageName+"-SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
						}
					</div>
					<table className="table table-striped">
						{tableHeader}
						{tableBody}
					</table>
					<Pagination currentSegment={itemState[itemState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemState.itemCount} listStart={itemState.listStart} listLimit={itemState.listLimit} onClick={onPaginationClick}/>
				</div>
			</div>
			<div id="filterModal" className="modal fade" role="dialog" aria-labelledby="basicModal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
							<h4 className="modal-title">Modal title</h4>
						</div>
						<div className="modal-body">
							<h3>Modal Body <i className="fa fa-cog fa-spin fa-3x fa-fw"/></h3>
						</div>
						<div className="modal-footer">
							<h3>Footer</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Table.propTypes = {
	itemState: PropTypes.object.isRequired,
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	parent: PropTypes.string,
	columns: PropTypes.array,
	labelGroup: PropTypes.string,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onOrderBy: PropTypes.func,
	onHeader: PropTypes.func,
	onOption: PropTypes.func,
	moveSelectedItem: PropTypes.object,
	moveHeader: PropTypes.string
};

export default Table;
