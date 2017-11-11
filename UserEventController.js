
class UserEventController extends BaseController {
public function getEventGuestForm(Request $request) {
                                        $response['success'] = false;
                                        $ch = curl_init();

                                        curl_setopt($ch, CURLOPT_URL, "https://api.createsend.com/api/v3.1/lists/e4887afd46fd8553b7f76eb4e7625dc0/customfields.json");
                                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                                        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

                                        curl_setopt($ch, CURLOPT_USERPWD, "e6d52fa9f736c2ad5b38248b9e11bc4112127cc800dd088f" . ":" . "x");

                                        $result = curl_exec($ch);
                                        if (curl_errno($ch)) {
                                            echo 'Error:' . curl_error($ch);
                                        }
                                        $result = json_decode($result, true);
                                        if (!empty($result)) {
                                            foreach ($result as $key => $value) {
                                                $result[$key]['Name'] = substr($value['Key'], 1, -1);
                                            }
                                            $response['success'] = true;
                                            $response['data'] = $result;
                                        }
                                        curl_close($ch);
                                        return response()->json($response);
                                    }
                                    
                                    
                                    public function addSubscriber(Request $request) {
                                        $ResponseArray = array();
                                        $ResponseArray['success'] = false;
                                        $Input = Input::all();
                                        $response['success'] = false;
                                        $ch = curl_init();
                                        $RequestData = array(
                                            'EmailAddress' => $Input['EmailAddress'],
                                            "Name" => "New Subscriber"
                                        );
                                        unset($Input['EmailAddress']);

                                        if (!empty($Input)) {
                                            $CustomFields = array();
                                            foreach ($Input as $key => $value) {
                                                $CustomFields[] = array('key' => $key, 'value' => $value);
                                            }
                                            $RequestData['CustomFields'] = $CustomFields;
                                        }
//                                        $fields_string = http_build_query($RequestData);
                                        $RequestData = json_encode($RequestData);
                                        curl_setopt($ch, CURLOPT_URL, "https://api.createsend.com/api/v3.1/subscribers/e4887afd46fd8553b7f76eb4e7625dc0.json");
                                        curl_setopt($ch, CURLOPT_POST, 1);
                                        curl_setopt($ch, CURLOPT_POSTFIELDS, $RequestData);

                                        curl_setopt($ch, CURLOPT_USERPWD, "e6d52fa9f736c2ad5b38248b9e11bc4112127cc800dd088f" . ":" . "x");

                                        $result = curl_exec($ch);
                                        if (curl_errno($ch)) {
                                            echo 'Error:' . curl_error($ch);
                                        }
//                                        $result = json_decode($result, true);
                                        if (!empty($result)) {
                                            $response['success'] = true;
                                            $response['data'] = $result;
                                        }
                                        curl_close($ch);
                                        return response()->json($response);
                                    }
                                    }
