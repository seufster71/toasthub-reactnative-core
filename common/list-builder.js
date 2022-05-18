import React from 'react';
import PropTypes from 'prop-types';
import List from '../../coreView/common/list';
import ShowEntries from './show-entries';
import OrderBy from './order-by';
import SearchBy from './search-by';
import Search from './search';
import Pagination from './pagination';
import moment from 'moment';

const ListBuilder = ({header, itemState, columns, appPrefs, parent, onListLimitChange, onSearchClick, 
	onSearchChange, onPaginationClick, onOrderBy, onHeader, onOption, goBack}) => {
	let striped = true;
	let parentName = "";
	if (parent != null) {
		parentName = parent;
	}
	let tableHeader = "";
	let tableRows = [];
	
	
	let listRows = [];
	// fill list
	if (itemState != null && itemState.items != null && itemState.items.length > 0) {
		let even = true;
	    for (let i = 0; i < itemState.items.length; i++) {
	    	let cells = [];
	    	let lines = [];
	    	for (let c = 0; c < columns.length; c++) {
				if (columns[c].optionalParams != null) {
					let opt = JSON.parse(columns[c].optionalParams);
					let value = "";
					let label = columns[c].value;
					if (opt.conditionParent != null && opt.conditionParent == "NotNull" && (parent == null || parent == "")) {
						continue;
					}
					if (opt.field != null) {
						value = itemState.items[i][opt.field];
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
							value = "Active";
						} else {
							value = "Disabled";
						}
					} else if (opt.fieldIcon != null) {
						value = [];
						if (onOption != null) {
							for(let j = 0; j < opt.fieldIcon.length; j++) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={() => onOption(opt.fieldIcon[j].code,itemState.items[i])} aria-hidden="true"/>);
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
					}
					lines.push(
							<div key={columns[c].id}>{label}: {value}</div>
					);
				} else {
					lines.push(
						<div key={columns[c].id}> no data</div>
					);
				}
			}
	    	
	    	
	    	let active = "Disabled";
	    	if (itemState.items[i].active == true) {
	    		active = "Active";
	    	}
	    	let created = "";
	    	if (itemState.items[i].created != null) {
	    		created = new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(itemState.items[i].created).toDate());
	    	}
	    	let modified = "";
	    	if (itemState.items[i].modified != null) {
	    		modified = new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(itemState.items[i].modified).toDate());
	    	}
	    	
	    	
	    	cells.push(
	    		<div key={0} >
		            <div className="row">
		              <div className="col-md-4">
		                {lines}
		              </div>
		            </div>
		        </div>
            );

	    	listRows.push(<li key={itemState.items[i].id} className="list-group-item">{cells}</li>);
	    	
	    }
  	} else {
	    listRows.push(<li key="1"><div id={appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</div></li>);
  	}
	
	let classListGroup = "list-group list-unstyled";	
	if (striped == true) {
		classListGroup = "list-group list-unstyled list-group-striped";
	}
	
	return (
		<div className="col-md-12 col-sm-12 col-xs-12">
        	<div className="x_panel">
        		<div className="x_title">
        			{header}
        			<ul className="navbar-right panel_toolbox">
        				 <li><i className="fa fa-plus" title="Add" onClick={() => onOption("MODIFY")}/></li>;
        			</ul>
          		</div>
          		<div className="x_content">
	          		<div className="row">
	          			<ShowEntries name={itemState.pageName+"-LISTLIMIT"} appPrefs={appPrefs} listLimit={itemState.listLimit} onListLimitChange={onListLimitChange}/>
	          			<OrderBy itemState={itemState} name={itemState.pageName+"-ORDERBY"} appPrefs={appPrefs} columns={columns} parent={parent} onOrderBy={onOrderBy}/>
						<SearchBy itemState={itemState} name={itemState.pageName+"-SEARCHBY"} appPrefs={appPrefs} columns={columns} parent={parent} onSearchClick={onSearchClick}/>
	          			<Search name={itemState.pageName+"-SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
	          		</div>
	          		<br/>
	            	<ul className={classListGroup}>
	              		{listRows}
	            	</ul>
	            	<Pagination currentSegment={itemState[itemState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemState.itemCount} listStart={itemState.listStart} listLimit={itemState.listLimit} onClick={onPaginationClick}/>
	          	</div>
        	</div>
      	</div>
	);
};

ListBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	header: PropTypes.string,
	parent: PropTypes.string,
	columns: PropTypes.array,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onOrderBy: PropTypes.func,
	onHeader: PropTypes.func,
	onOption1: PropTypes.func,
	onOption2: PropTypes.func,
	onOption3: PropTypes.func,
	onOption4: PropTypes.func,
	onOption5: PropTypes.func,
	onOption6: PropTypes.func,
	goBack: PropTypes.func
};

export default ListBuilder;
