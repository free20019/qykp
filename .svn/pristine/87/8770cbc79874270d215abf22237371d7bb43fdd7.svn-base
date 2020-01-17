;(function (Vue, _, layui, util, config, axios) {
    var $, layer, form
    var vm = new Vue({
        el: '#root',
        data() {
            return {
                layLoaded: false,
                query:{
                    person_name: '',
                    department: '',
                },
                table: {
                    el: null,
                    data:[],
                    cols: config.tableColumn
                },
                dialog: {
                    editData: null,
                    form: {}
                },
                select: {
                    user: [],
                    userid: ''
                },
                selectItem:[]
            }
        },
        beforeCreate() {
            layui.use(['table', 'laydate'], () => {
                var {data} = this.table
                var layTable = layui.table
                $ = layui.jquery
                layer = layui.layer
                form = layui.form
                vm.table.el = layTable.render({
                    id: 'tw-table',
                    elem: '.tw-table-placeholder',
                    height: 'full-80',
                    size: 'sm',
                    page: true,
                    limit: 50,
                    cols: vm.table.cols,
                    data
                })
                vm.layLoaded = true
            })
        },
        mounted() {
            if (!this.dialog.editData) {
                this.dialog.editData = new EditData(
                    this.dialog.form,
                    this,
                    config.editItem('编辑', this.select.user)
                )
            }
            this.getUser();
            this.findWorkSummary();
        },
        computed: {},
        methods: {
            findWorkSummary(){
                const {person_name, department} = this.query;
                axios.get('../../personnelMatters/findWorkSummary', {
                    params: {
                        person_name,
                        department
                    }
                }).then(res => {
                    this.table.data = _.each(res.data,(item,index)=>{
                        item.gridId=index+1;
                    })||[];
                    if(this.table.el) this.table.el.reload({ data:this.table.data })
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getUser() {
                axios.get('../../personnelMatters/getUser', {
                    params: {}
                }).then(res => {
                    this.select.user = _.map(res.data, (item, index) => {
                        return {label: item.USERNAME, value: item.USERID};
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            },
            addWorkSummary(){
                var {age,sex,education,politic_countenance,join_time,work_summary,post,department} =this.dialog.form
                var {userid} =this.select
                if(userid===''||age===''||sex===''||education===''||politic_countenance===''||join_time===''||work_summary===''||post===''||department===''){
                    layer.msg("请填写完整信息！");
                    return ;
                }
                let params = new URLSearchParams();
                params.append('userid', userid);
                params.append('age', age);
                params.append('sex', sex);
                params.append('education', education);
                params.append('politic_countenance', politic_countenance);
                params.append('join_time', join_time);
                params.append('work_summary', work_summary);
                params.append('post', post);
                params.append('department', department);
                axios.post('../../personnelMatters/addWorkSummary',params, {
                }).then(res => {
                    if(res.data>0){
                        layer.closeAll(); //疯狂模式，关闭所有层
                        layer.msg("操作成功！");
                        this.findWorkSummary();
                    }else if (res.data===0){
                        layer.msg("操作失败！");
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            },
            evaluateWorkSummary(){
                var {department_leader, evaluation_date, department_evaluation} =this.dialog.form
                if(this.selectItem.ID===''||department_leader===''||evaluation_date===''||department_evaluation===''){
                    layer.msg("请填写完整信息！");
                    return ;
                }
                let params = new URLSearchParams();
                params.append('department_leader', department_leader);
                params.append('evaluation_date', evaluation_date);
                params.append('department_evaluation', department_evaluation);
                params.append('id', this.selectItem.ID);
                axios.post('../../personnelMatters/evaluateWorkSummary',params, {
                }).then(res => {
                    if(res.data>0){
                        layer.closeAll(); //疯狂模式，关闭所有层
                        layer.msg("操作成功！");
                        this.findWorkSummary();
                    }else if (res.data===0){
                        layer.msg("操作失败！");
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            },
            handleQueryClick() {
                this.findWorkSummary();
            },
            handleAddClick() {
                var html = this.createFormHtml('编辑')
                var options = config.layerOptions('添加工作总结', this.closeLayerOpen)
                options.btn = ['添加', '取消']
                var _this=this;
                options.yes = function (index,lay) {
                    _this.addWorkSummary();
                    return false
                }
                // options.btn2 = function (index,lay) {
                //     //return false 开启该代码可禁止点击该按钮关闭
                // }
                options.cancel= function(){
                    //右上角关闭回调
                    //return false 开启该代码可禁止点击该按钮关闭
                }
                layer.open(options)
                $('#dialogEdited').html(html)
                util.layDateControl(this)
                form.render('select')
                form.on('select', function(data){
                    _this.select.userid = data.value;
                });
            },
            handleReviewClick() {
                var checkStatus = layui.table.checkStatus('tw-table'); //idTest 即为基础参数 id 对应的值
                if(checkStatus.data.length!==1){
                    layer.msg("请选中一行！");
                    return ;
                }
                this.selectItem = checkStatus.data[0];
                this.dialog.form.username = checkStatus.data[0].USERNAME;
                this.dialog.form.age = checkStatus.data[0].AGE;
                this.dialog.form.sex = checkStatus.data[0].SEX;
                this.dialog.form.education = checkStatus.data[0].EDUCATION;
                this.dialog.form.politic_countenance = checkStatus.data[0].POLITIC_COUNTENANCE;
                this.dialog.form.join_time = checkStatus.data[0].JOIN_TIME;
                this.dialog.form.work_summary = checkStatus.data[0].WORK_SUMMARY;
                this.dialog.form.department_evaluation = checkStatus.data[0].DEPARTMENT_EVALUATION;
                this.dialog.form.department_leader = checkStatus.data[0].DEPARTMENT_LEADER;
                this.dialog.form.evaluation_date = checkStatus.data[0].EVALUATION_DATE;
                this.dialog.form.post = checkStatus.data[0].POST;
                this.dialog.form.department = checkStatus.data[0].DEPARTMENT;

                var html = this.createFormHtml('审批')
                var options = config.layerOptions('添加工作总结', this.closeLayerOpen)
                options.btn = ['评价', '取消']
                var _this=this;
                options.yes = function (index,lay) {
                    _this.evaluateWorkSummary();
                    return false
                }
                options.cancel= function(){
                    //右上角关闭回调
                    //return false 开启该代码可禁止点击该按钮关闭
                }
                layer.open(options)
                $('#dialogEdited').html(html)
                util.layDateControl(this)
                util.wrapEl('#dialogEdited', 'md6')
            },
            createFormHtml(type) {
                const editData = this.dialog.editData
                editData.options = config.editItem(type, this.select.user)
                return $('<div>')
                    .addClass('tw-form layui-form')
                    .html(editData.initTag())
            },
            closeLayerOpen() {
                this.dialog.editData.clearDate()
            }
        }
    })
})(Vue, _, layui, util, config, axios)
