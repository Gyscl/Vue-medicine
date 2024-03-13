<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
		<el-form-item label="药品名称" prop="mname">
			<el-input v-model="form.mname"></el-input>
		</el-form-item>
		<el-form-item label="价格" prop="mprice">
			<el-input v-model.number="form.mprice"></el-input>
		</el-form-item>
		<el-form-item label="图片地址" prop="msrc">
			<el-input v-model="form.msrc"></el-input>
		</el-form-item>
		<el-form-item label="功效" prop="minfo">
			<el-input :rows="2" type="textarea" v-model="form.minfo"></el-input>
		</el-form-item>
		<el-form-item label="库存数量" prop="mnum">
			<el-input v-model.number="form.mnum"></el-input>
		</el-form-item>
		<el-form-item label="药品类型" prop="mtype">
			<el-input v-model="form.mtype"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { ref } from 'vue';


const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	edit: {
		type: Boolean,
		required: false
	},
	update: {
		type: Function,
		required: true
	}
});

const defaultData = {
	mname: '',
	msrc: '',
	mprice: 0,
	minfo: '',
	mnum: 0,
	mtype: ''
};


const form = ref({ ...(props.edit ? props.data : defaultData) });

const rules: FormRules = {
	mname: [{ required: true, message: '不能为空', trigger: 'change' }],
	mprice: [{ required: true, message: '不能为空', trigger: 'change' }],
	msrc: [{ required: true, message: '不能为空', trigger: 'change' }],
	minfo: [{ required: true, message: '不能为空', trigger: 'change' }],
	mnum: [{ required: true, message: '不能为空', trigger: 'change' }],
	mtype: [{ required: true, message: '不能为空', trigger: 'change' }]
};
const formRef = ref<FormInstance>();
const saveEdit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(valid => {
		if (!valid) {
			return false;
		} else {
			props.update(form.value);
		}

	});
};

</script>

<style></style>
