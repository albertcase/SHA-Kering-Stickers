<?php

class SiteController extends Controller
{
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */

	public function actionIndex()
	{
		$this->render('index');
	}

	public function actionGallery()
	{
		$this->render('gallery');
	}

	public function actionPhoto(){
		if (!isset($_SESSION['weixin_info_id'])) {
			Header("Location:/weixin/oauth?callback=/site/photo");
			Yii::app()->end();
		}
		$this->render('photo');
	}

	public function actionFounder(){
		if (!isset($_SESSION['weixin_info_id'])) {
			Header("Location:/weixin/oauth?callback=/site/founder");
			Yii::app()->end();
		}
		$this->render('founder');
	}

	public function actionHistory(){
		$this->render('history');
	}

	public function actionStore($id)
	{
		$sql = "select * from same_store where id = ".intval($id);
		$store = Yii::app()->db->createCommand($sql)->queryRow();
		$this->render('store', array('store' => $store));
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}
}